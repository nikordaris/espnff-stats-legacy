import { range, minBy, maxBy, has } from "lodash";
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
  totalCoachRating
} from "../statUtils";

const resolvers = {
  Query: {
    teamStats: async (_, { teamId }, context, info) => {
      const totalScoringPeriods = context.totalScoringPeriods || 17;
      const teamStats = await Promise.all(
        range(1, totalScoringPeriods + 1).map(scoringPeriodId =>
          context.api.getLeagueStandings(teamId, scoringPeriodId)
        )
      );

      const enrichedTeamStats = teamStats
        .filter(i => !!i)
        .reduce((result, teamStats) => {
          teamStats.prevStats = result;
          teamStats.scoringDifferential = scoringDifferential(teamStats);
          teamStats.optimalPoints = optimalPoints(
            teamStats,
            context.lineupSlotIds
          );
          teamStats.efficiency = efficiency(teamStats);
          teamStats.seasonStdDevPF = seasonStdDevPF(teamStats);
          teamStats.totalAgainst = totalAgainst(teamStats);
          teamStats.totalFor = totalFor(teamStats);
          teamStats.totalBench = totalBench(teamStats);
          teamStats.totalDifferential = totalDifferential(teamStats);
          teamStats.totalOptimal = totalOptimal(teamStats);
          teamStats.totalEfficiency = totalEfficiency(teamStats);
          teamStats.totalCoachRating = totalCoachRating(teamStats);

          return [...result, teamStats];
        }, []);
      // console.log(enrichedTeamStats);
      return enrichedTeamStats;
    }
  },
  TeamStats: {
    last3AvgFor: root => {
      const prev = [...root.prevStats, root];
      if (prev && prev.length >= 3) {
        const total = prev
          .slice(-3)
          .reduce((result, stat) => result + stat.pointsFor, 0);
        if (total > 0) {
          return total / 3;
        }
        return null;
      }
      return null;
    },
    seasonAvgFor: root => {
      const prev = [...root.prevStats, root];
      if (prev && prev.length > 0) {
        const total = prev.reduce((result, stat) => result + stat.pointsFor, 0);
        if (total > 0) {
          return total / prev.length;
        }
        return null;
      }
      return null;
    },
    seasonHighFor: root => {
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
    },
    seasonLowFor: root => {
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
    },
    last3AvgOptimal: root => {
      const prev = [...root.prevStats, root];
      if (prev && prev.length >= 3) {
        const total = prev
          .slice(-3)
          .reduce((result, stat) => result + stat.optimalPoints, 0);
        if (total > 0) {
          return total / 3;
        }
        return null;
      }
      return null;
    },
    seasonAvgOptimal: root => {
      const prev = [...root.prevStats, root];
      if (prev && prev.length > 0) {
        const total = prev.reduce(
          (result, stat) => result + stat.optimalPoints,
          0
        );
        if (total > 0) {
          return total / prev.length;
        }
        return null;
      }
      return null;
    },
    seasonHighOptimal: root => {
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
    },
    seasonLowOptimal: root => {
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
    }
  }
};

export default resolvers;
