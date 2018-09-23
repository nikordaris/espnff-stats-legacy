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
    teamStats: async (_, { teamId }, context, info) =>
      await context.api.getTeamStats(teamId),
    leagueStats: async (_, __, context) => await context.api.getLeagueStats()
  }
};

export default resolvers;
