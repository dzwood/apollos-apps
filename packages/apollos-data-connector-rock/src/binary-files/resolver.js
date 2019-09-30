export default {
  Person: {
    photo: async ({ photo }, args, { dataSources: { BinaryFiles } }) => ({
      uri: await BinaryFiles.findOrReturnImageUrl({ image: photo }), // protect against passing null photo
    }),
  },
};
