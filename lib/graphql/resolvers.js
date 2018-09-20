
const resolvers = {
  Query: {
    standings: (_, args, context, info) => context.api.getLeagueStandings()
  }
};
