import { server } from "../lib/graphql";

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
