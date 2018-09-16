import { ApolloServer, gql } from "apollo-server-lambda";
import fs from "fs";
import resolvers from "./resolvers";

// const typeDefs = gql(
//   fs.readFileSync(__dirname.concat("/schema.graphql"), "utf8")
// );

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

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
