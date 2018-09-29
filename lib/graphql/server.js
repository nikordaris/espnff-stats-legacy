import { ApolloServer, gql } from "apollo-server-lambda";
import resolvers from "./resolvers";
import typeDefs from "./schema.graphql";
import { getTeamStats, getLeagueStats, getStandings } from "../espnApi";

const createServer = (
  espnS2,
  SWID,
  leagueId,
  season,
  totalScoringPeriods = 17,
  lineupSlotIds = "0,2,2,4,4,3,6,16,17",
  leagueSize = 12
) =>
  new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ event, context }) => ({
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
      api: {
        getTeamStats: teamId =>
          getTeamStats(
            { espnS2, SWID },
            leagueId,
            teamId,
            lineupSlotIds.split(","),
            season,
            totalScoringPeriods
          ),
        getLeagueStats: () =>
          getLeagueStats(
            { espnS2, SWID },
            leagueId,
            lineupSlotIds.split(","),
            season,
            totalScoringPeriods,
            leagueSize
          ),
        getStandings: () => getStandings({ espnS2, SWID }, leagueId, season)
      }
    })
  });

export default createServer;
