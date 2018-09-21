const resolvers = {
  Query: {
    standings: async (_, args, context, info) => {
      const standing = await context.api.getLeagueStandings(1, 1);
      return [standing];
    }
  }
};

export default resolvers;
