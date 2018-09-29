import { createServer } from "../lib/graphql";

const server = createServer(
  process.env.ESPN_S3_COOKIE,
  process.env.SWID_COOKIE,
  process.env.LEAGUE_ID,
  process.env.SEASON,
  process.env.TOTAL_SCORING_PERIODS,
  process.env.LINEUP_SLOT_IDS,
  process.env.LEAGUE_SIZE
);

export const query = (event, context, callback) => {
  const handler = server.createHandler({
    cors: {
      origin: "*",
      credentials: true
    }
  });
  context.callbackWaitsForEmptyEventLoop = false;
  return handler(event, context, callback);
};
