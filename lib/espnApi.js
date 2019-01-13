import { has, range, get } from "lodash";
import fetch from "./espnFetch";
import {
  playerPositions,
  lineupPositions,
  nflTeams,
  nflTeamsAbbrev,
  boxscoreUrl,
  standingsUrl,
  streakType
} from "./espnConstants";
import {
  optimalPoints,
  totalFor,
  totalOptimal,
  scoringDifferential,
  efficiency,
  totalEfficiency,
  totalAgainst,
  totalBench,
  totalDifferential,
  seasonStdDevPF,
  totalCoachRating,
  last3AvgFor,
  last3AvgOptimal,
  seasonAvgFor,
  seasonAvgOptimal,
  seasonHighFor,
  seasonHighOptimal,
  seasonLowFor,
  seasonLowOptimal
} from "./statUtils";

const mapPlayers = players =>
  players.map(player => ({
    playerId: player.player.playerId,
    playerName: `${player.player.firstName} ${player.player.lastName}`,
    eligibleSlotCategoryIds: player.player.eligibleSlotCategoryIds,
    playerPosition:
      playerPositions[player.player.eligibleSlotCategoryIds.join(", ")],
    lineupPosition: lineupPositions[player.slotCategoryId.toString()],
    nflTeam: nflTeams[player.player.proTeamId.toString()],
    nflTeamAbbrev: nflTeamsAbbrev[player.player.proTeamId.toString()],
    nflTeamOpp: nflTeams[player.opponentProTeamId.toString()],
    nflTeamOppAbbrev: nflTeamsAbbrev[player.opponentProTeamId.toString()],
    projectedPoints: player.currentPeriodProjectedStats.appliedStatTotal,
    realPoints: player.currentPeriodRealStats.appliedStatTotal || 0
  }));

const mapTeam = (team, opponentTeam) => ({
  teamName: `${team.team.teamLocation} ${team.team.teamNickname}`,
  teamAbbrev: team.team.teamAbbrev,
  logoUrl: team.logoUrl,
  teamId: team.teamId,
  pointsFor: team.appliedActiveRealTotal,
  pointsAgainst: get(opponentTeam, "appliedActiveRealTotal", null),
  projectedPointsFor: team.appliedActiveProjectedTotal,
  projectedPointsAgainst: get(
    opponentTeam,
    "appliedActiveProjectedTotal",
    null
  ),
  benchPointsFor: team.appliedInactiveRealTotal,
  benchPointsAgainst: get(opponentTeam, "appliedInactiveRealTotal", null),
  projectedBenchPointsFor: team.appliedInactiveProjectedTotal,
  projectedBenchPointsAgainst: get(
    opponentTeam,
    "appliedInactiveProjectedTotal",
    null
  ),
  players: mapPlayers(team.slots.filter(player => !!player.player))
});

const teamStats = (team, lineupSlotIds) => {
  team.scoringDifferential = scoringDifferential(team);
  team.optimalPoints = optimalPoints(team, lineupSlotIds);
  team.efficiency = efficiency(team);

  return team;
};

export async function getTeamBoxscoreStats(
  cookies,
  leagueId,
  teamId,
  scoringPeriodId,
  lineupSlotIds,
  season = 2018
) {
  const url = boxscoreUrl(leagueId, teamId, scoringPeriodId, season);
  const lineups = await fetch(url, cookies);
  if (has(lineups, "boxscore.teams")) {
    const team = lineups.boxscore.teams.find(
      team => team.team.teamId === teamId
    );
    const opponentTeam = lineups.boxscore.teams.find(
      team => team.team.teamId !== teamId
    );

    if (team && team.appliedActiveRealTotal > 0) {
      return {
        ...teamStats(mapTeam(team, opponentTeam), lineupSlotIds),
        id: `${teamId}-${scoringPeriodId}`,
        scoringPeriodId
      };
    }
  }
  return null;
}

export async function getTeamStats(
  cookies,
  leagueId,
  teamId,
  lineupSlotIds,
  season = 2018,
  totalScoringPeriods = 17
) {
  const teamStats = await Promise.all(
    range(1, totalScoringPeriods + 1).map(scoringPeriodId =>
      getTeamBoxscoreStats(
        cookies,
        leagueId,
        teamId,
        scoringPeriodId,
        lineupSlotIds,
        season
      )
    )
  );

  const enrichedTeamStats = teamStats
    .filter(s => !!s)
    .reduce((result, stat) => {
      stat.prevStats = result;
      stat.seasonStdDevPF = seasonStdDevPF(stat);
      stat.totalAgainst = totalAgainst(stat);
      stat.totalFor = totalFor(stat);
      stat.totalBench = totalBench(stat);
      stat.totalDifferential = totalDifferential(stat);
      stat.totalOptimal = totalOptimal(stat);
      stat.totalEfficiency = totalEfficiency(stat);
      stat.totalCoachRating = totalCoachRating(stat);
      stat.last3AvgFor = last3AvgFor(stat);
      stat.last3AvgOptimal = last3AvgOptimal(stat);
      stat.seasonAvgFor = seasonAvgFor(stat);
      stat.seasonAvgOptimal = seasonAvgOptimal(stat);
      stat.seasonHighFor = seasonHighFor(stat);
      stat.seasonHighOptimal = seasonHighOptimal(stat);
      stat.seasonLowFor = seasonLowFor(stat);
      stat.seasonLowOptimal = seasonLowOptimal(stat);

      return [...result, stat];
    }, []);

  return enrichedTeamStats;
}

export async function getLeagueStats(
  cookies,
  leagueId,
  lineupSlotIds,
  season = 2018,
  totalScoringPeriods = 17,
  leagueSize = 12
) {
  const leagueStats = await Promise.all(
    range(1, leagueSize + 1).map(teamId =>
      getTeamStats(
        cookies,
        leagueId,
        teamId,
        lineupSlotIds,
        season,
        totalScoringPeriods
      )
    )
  );

  return leagueStats
    .filter(s => !!s && s.length > 0)
    .map(
      teamStats => ({
        id: `${teamStats[0].teamId}-${teamStats[0].teamName}`,
        teamId: teamStats[0].teamId,
        teamName: teamStats[0].teamName,
        teamAbbrev: teamStats[0].teamAbbrev,
        logoUrl: teamStats[0].logoUrl,
        teamStats
      }),
      []
    );
}

const mapTeamStandings = teams =>
  teams.map(
    ({
      teamNickname,
      teamLocation,
      teamAbbrev,
      teamId,
      owners,
      division: { divisionName },
      record: {
        overallWins,
        overallLosses,
        streakLength,
        pointsFor,
        pointsAgainst,
        ...record
      },
      divisionStanding,
      overallStanding
    }) => ({
      teamName: `${teamLocation} ${teamNickname}`,
      id: teamId,
      owners: owners.map(owner => ({ ...owner, id: owner.ownerId })),
      teamAbbrev,
      divisionName,
      wins: overallWins,
      losses: overallLosses,
      streakLength: streakLength,
      streakType: streakType[record.streakType],
      pointsFor: pointsFor,
      pointsAgainst: pointsAgainst,
      divisionStanding,
      overallStanding
    })
  );

export async function getStandings(cookies, leagueId, season = 2018) {
  const url = standingsUrl(leagueId, season);
  const response = await fetch(url, cookies);
  return mapTeamStandings(response.teams);
}

export default {
  getLeagueStats,
  getTeamStats,
  getStandings
};
