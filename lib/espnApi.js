import fetch from "espnFetch";
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

const mapTeams = teams =>
  teams.map(team => ({
    teamName: `${team.team.teamLocation} ${team.team.teamNickname}`,
    teamAbbrev: team.team.teamAbbrev,
    logoUrl: team.team.logoUrl,
    teamId: team.teamId,
    projectedPoints: team.appliedActiveProjectedTotal,
    realPoints: team.appliedActiveRealTotal,
    players: mapPlayers(team.slots)
  }));

export function getLeagueStandings(
  cookies,
  leagueId,
  teamId,
  scoringPeriodId,
  season = 2018
) {
  let url = `http://games.espn.com/ffl/api/v2/boxscore?leagueId=${leagueId}&teamId=${teamId}&scoringPeriodId=${scoringPeriodId}&seasonId=${season}`;
  return fetch(url, cookies).then(lineups => {
    return mapTeams(lineups.boxscore.teams);
  });
}

export default {
  getLeagueStandings
};
