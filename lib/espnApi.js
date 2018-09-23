import { has } from "lodash";
import fetch from "./espnFetch";
import {
  playerPositions,
  lineupPositions,
  nflTeams,
  nflTeamsAbbrev
} from "./espnConstants";

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
  pointsAgainst: opponentTeam.appliedActiveRealTotal,
  projectedPointsFor: team.appliedActiveProjectedTotal,
  projectedPointsAgainst: opponentTeam.appliedActiveProjectedTotal,
  benchPointsFor: team.appliedInactiveRealTotal,
  benchPointsAgainst: opponentTeam.appliedInactiveRealTotal,
  projectedBenchPointsFor: team.appliedInactiveProjectedTotal,
  projectedBenchPointsAgainst: opponentTeam.appliedInactiveProjectedTotal,
  players: mapPlayers(team.slots.filter(player => !!player.player))
});

export async function getLeagueStandings(
  cookies,
  leagueId,
  teamId,
  scoringPeriodId,
  season = 2018
) {
  let url = `http://games.espn.com/ffl/api/v2/boxscore?leagueId=${leagueId}&teamId=${teamId}&scoringPeriodId=${scoringPeriodId}&seasonId=${season}`;
  const lineups = await fetch(url, cookies);
  if (has(lineups, "boxscore.teams")) {
    const team = lineups.boxscore.teams.find(
      team => team.team.teamId === teamId
    );
    const opponentTeam = lineups.boxscore.teams.find(
      team => team.team.teamId !== teamId
    );

    if (team && team.appliedActiveRealTotal > 0) {
      return { ...mapTeam(team, opponentTeam), scoringPeriodId };
    }
  }
  return null;
}

export default {
  getLeagueStandings
};
