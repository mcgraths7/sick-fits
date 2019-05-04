const Mutation = {
  async createItem(parent, args, ctx, info) {
    // TODO verify user is logged in
    const item = await ctx.db.mutation.createItem({ data: { ...args } }, info);
    return item;
  },
  updateItem(parent, args, ctx, info) {
    // ? Create a copy of the args parameter so we can safely remove the id
    const updates = { ...args };
    // ? remove the id from our newly created updates variable, we don't want to update the id
    delete updates.id;
    // ? return the data from when the update is successful or fails from info (info tells us what fields are coming back)
    return ctx.db.mutation.updateItem(
      {
        data: { updates },
        where: {
          id: args.id,
        },
      },
      info
    );
  },
};

module.exports = Mutation;
