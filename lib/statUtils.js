import { maxBy, remove } from "lodash";
import { stdev } from "stats-lite";

export const optimalLineup = (root, lineupSlotIds) => {
  const players = [...root.players];
  return lineupSlotIds.map(slot => {
    const slotPlayers = players.filter(p =>
      p.eligibleSlotCategoryIds.includes(parseInt(slot))
    );
    const topPlayer = maxBy(slotPlayers, player => player.realPoints);

    if (topPlayer) {
      remove(players, player => player.playerId === topPlayer.playerId);
      return topPlayer;
    }
    return null;
  });
};

export const optimalPoints = (root, lineupSlotIds) => {
  const bestLineup = optimalLineup(root, lineupSlotIds);
  return (
    Math.round(
      bestLineup.reduce((result, player) => result + player.realPoints, 0) * 10
    ) / 10
  );
};

export const totalFor = root => {
  const prev = [...root.prevStats, root];
  if (prev && prev.length > 0) {
    const total = prev.reduce((result, stat) => result + stat.pointsFor, 0);
    if (total > 0) {
      return Math.round(total * 10) / 10;
    }
    return null;
  }
  return null;
};

export const totalAgainst = root => {
  const prev = [...root.prevStats, root];
  if (prev && prev.length > 0) {
    const total = prev.reduce((result, stat) => result + stat.pointsAgainst, 0);
    if (total > 0) {
      return Math.round(total * 10) / 10;
    }
    return null;
  }
  return null;
};

export const totalBench = root => {
  const prev = [...root.prevStats, root];
  if (prev && prev.length > 0) {
    const total = prev.reduce(
      (result, stat) => result + stat.benchPointsFor,
      0
    );
    if (total > 0) {
      return Math.round(total * 10) / 10;
    }
    return null;
  }
  return null;
};

export const totalOptimal = root => {
  const prev = [...root.prevStats, root];
  if (prev && prev.length > 0) {
    const total = prev.reduce((result, stat) => result + stat.optimalPoints, 0);
    if (total > 0) {
      return Math.round(total * 10) / 10;
    }
  }
  return null;
};

export const totalDifferential = root => {
  const prev = [...root.prevStats, root];
  if (prev && prev.length > 0) {
    return prev.reduce((result, stat) => result + stat.scoringDifferential, 0);
  }
  return null;
};

export const scoringDifferential = root =>
  Math.round((root.pointsFor - root.pointsAgainst) * 10) / 10;

export const efficiency = root =>
  Math.round((root.pointsFor / root.optimalPoints) * 100) / 100;

export const totalEfficiency = root =>
  Math.round((root.totalFor / root.totalOptimal) * 100) / 100;

export const seasonStdDevPF = root =>
  stdev([...root.prevStats, root].map(i => i.pointsFor));

export const totalCoachRating = root =>
  Math.round(
    (1 - root.seasonStdDevPF / 100) *
      (root.totalEfficiency * (100 + root.totalBench) + root.totalFor) *
      100
  ) / 100;
