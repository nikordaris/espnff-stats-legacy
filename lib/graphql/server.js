import { ApolloServer, gql } from "apollo-server-lambda";
import fs from "fs";
import resolvers from "./resolvers";
import typeDefs from "./schema.graphql";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  })
});

export default server;
