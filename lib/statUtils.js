import { maxBy, remove, has, minBy } from "lodash";
import { stdev } from "stats-lite";

export const optimalLineup = (root, lineupSlotIds) => {
  const players = [...root.players];
  return lineupSlotIds
    .map(slot => {
      const slotPlayers = players.filter(p =>
        p.eligibleSlotCategoryIds.includes(parseInt(slot))
      );
      const topPlayer = maxBy(slotPlayers, player => player.realPoints);

      if (topPlayer) {
        remove(players, player => player.playerId === topPlayer.playerId);
        return topPlayer;
      }
      return null;
    })
    .filter(i => !!i);
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
  Math.round(stdev([...root.prevStats, root].map(i => i.pointsFor)) * 100) /
  100;

export const totalCoachRating = root =>
  Math.round(
    (1 - root.seasonStdDevPF / 100) *
      (root.totalEfficiency * (100 + root.totalBench) + root.totalFor) *
      100
  ) / 100;

export const last3AvgFor = root => {
  const prev = [...root.prevStats, root];
  if (prev && prev.length >= 3) {
    const total = prev
      .slice(-3)
      .reduce((result, stat) => result + stat.pointsFor, 0);
    if (total > 0) {
      return Math.round((total / 3) * 100) / 100;
    }
    return null;
  }
  return null;
};

export const seasonAvgFor = root => {
  const prev = [...root.prevStats, root];
  if (prev && prev.length > 0) {
    const total = prev.reduce((result, stat) => result + stat.pointsFor, 0);
    if (total > 0) {
      return Math.round((total / prev.length) * 100) / 100;
    }
    return null;
  }
  return null;
};

export const seasonHighFor = root => {
  const prev = [...root.prevStats, root];
  if (prev && prev.length > 0) {
    const max = maxBy(
      prev.filter(i => i.pointsFor > 0),
      stat => stat.pointsFor
    );
    if (has(max, "pointsFor")) {
      return max.pointsFor;
    }
  }
  return null;
};

export const seasonLowFor = root => {
  const prev = [...root.prevStats, root];
  if (prev && prev.length > 0) {
    const min = minBy(
      prev.filter(i => i.pointsFor > 0),
      stat => stat.pointsFor
    );
    if (has(min, "pointsFor")) {
      return min.pointsFor;
    }
  }
  return null;
};

export const last3AvgOptimal = root => {
  const prev = [...root.prevStats, root];
  if (prev && prev.length >= 3) {
    const total = prev
      .slice(-3)
      .reduce((result, stat) => result + stat.optimalPoints, 0);
    if (total > 0) {
      return Math.round((total / 3) * 100) / 100;
    }
    return null;
  }
  return null;
};

export const seasonAvgOptimal = root => {
  const prev = [...root.prevStats, root];
  if (prev && prev.length > 0) {
    const total = prev.reduce((result, stat) => result + stat.optimalPoints, 0);
    if (total > 0) {
      return Math.round((total / prev.length) * 100) / 100;
    }
    return null;
  }
  return null;
};

export const seasonHighOptimal = root => {
  const prev = [...root.prevStats, root];
  if (prev && prev.length > 0) {
    const max = maxBy(
      prev.filter(i => i.optimalPoints > 0),
      stat => stat.optimalPoints
    );
    if (has(max, "optimalPoints")) {
      return max.optimalPoints;
    }
  }
  return null;
};

export const seasonLowOptimal = root => {
  const prev = [...root.prevStats, root];
  if (prev && prev.length > 0) {
    const min = minBy(
      prev.filter(i => i.optimalPoints > 0),
      stat => stat.optimalPoints
    );
    if (has(min, "optimalPoints")) {
      return min.optimalPoints;
    }
  }
  return null;
};
