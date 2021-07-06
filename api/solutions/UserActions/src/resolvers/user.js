/**
 * Topic: Back-end Learning path
 * Subject: noSQL - Graph DB: GraphQL - Nodejs - Apollo Server Express - Mongoose library
 * Student name: Nguyễn Trường Thịnh
 * Thu Duc College Of Technology
 * Created At: 6/ 7/ 2021
 *
 * Our User nested queries resolver
 */
 module.exports = {
    // Resolve the list of notes for a user when requested
    notes: async (user, args, { models }) => {
      return await models.Note.find({ author: user._id }).sort({ _id: -1 });
    },
    // Resolve the list of favorites for a user when requested
    favorites: async (user, args, { models }) => {
      return await models.Note.find({ favoritedBy: user._id }).sort({ _id: -1 });
    },
  };
  