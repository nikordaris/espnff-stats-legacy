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
    teamStats: async (_, { id }, context, info) =>
      await context.api.getTeamStats(parseInt(id)),
    leagueStats: async (_, __, context) => await context.api.getLeagueStats(),
    standings: async (_, __, context) => await context.api.getStandings()
  }
};

export default resolvers;
