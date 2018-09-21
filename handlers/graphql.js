import { createServer } from "../lib/graphql";

const server = createServer(
  process.env.ESPN_S3_COOKIE,
  process.env.SWID_COOKIE,
  process.env.LEAGUE_ID,
  process.env.SEASON
);

export const query = (event, context, callback) => {
  console.log("LEAGUE_ID: ", process.env.LEAGUE_ID);
  const handler = server.createHandler({
    cors: {
      origin: "*",
      credentials: true
    }
  });
  context.callbackWaitsForEmptyEventLoop = false;
  return handler(event, context, callback);
};
