import { ApolloServer, gql } from "apollo-server-lambda";
import fs from "fs";
import resolvers from "./resolvers";
import typeDefs from "./schema.graphql";
import { getLeagueStandings } from "../espnApi";

const createServer = (
  espnS2,
  SWID,
  leagueId,
  season,
  totalScoringPeriods = 17,
  lineupSlotIds = "0,2,2,4,4,3,6,16,17"
) =>
  new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ event, context }) => ({
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
      totalScoringPeriods,
      lineupSlotIds: lineupSlotIds.split(","),
      api: {
        getLeagueStandings: (teamId, scoringPeriodId) =>
          getLeagueStandings(
            { espnS2, SWID },
            leagueId,
            teamId,
            scoringPeriodId,
            season
          )
      }
    })
  });

export default createServer;
