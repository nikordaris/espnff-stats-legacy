import { server } from "../lib/graphql";
const handler = server.createHandler();

export const query = (event, context, cb) => {
  console.log(event);
  return cb();
  // return handler(event, context, cb);
};
