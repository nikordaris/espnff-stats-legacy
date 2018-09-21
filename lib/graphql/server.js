import { ApolloServer, gql } from "apollo-server-lambda";
import fs from "fs";
import resolvers from "./resolvers";
import typeDefs from "./schema.graphql";
import { getLeagueStandings } from "../espnApi";

const createServer = (espnS2, SWID, leagueId, season) =>
  new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ event, context }) => ({
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
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
