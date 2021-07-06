const models = require("../../api/solutions/Details/src/models");

/**
 * Topic: Back-end Learning path
 * Subject: noSQL - Graph DB: GraphQL - Nodejs - Apollo Server Express - Mongoose library
 * Student name: Nguyễn Trường Thịnh
 * Thu Duc College Of Technology
 * Created At: 3/ 7/ 2021
 * Updated At: 6/ 7/ 2021: Adding user queries: user's info, all users, current user;
 *                         Data limitations
 *
 * Our queries resolver
 */
module.exports = {
  notes: async (parent, args, { models }) => {
    return await models.Note.find().limit(100);
  },
  note: async (parent, args, { models }) => {
    return await models.Note.findById(args.id);
  },
  user: async (parent, args, { models }) => {
    // Find a user given their username
    return await models.User.findOne({ username: args.username });
  },
  users: async (parent, args, { models }) => {
    // Find all users
    return await models.User.find({}).limit(100);
  },
  me: async (parent, args, { models, user }) => {
    // Find a user given the current user context
    return await models.User.findById(user.id);
  },
  noteFeed: async (parent, { cursor }, { models }) => {
    // Hardcode the limit to 10 items
    const limit = 10;
    // Set the default hasNextPage value to false
    let hasNextPage = false;
    /**
     * If no cursor is passed the default query will be empty
     * this will pull the newest notes from the db
     */
    let cursorQuery = {};
    /**
     * If there is a cursor, our query will look for notes
     * with an ObjectId less than that of the cursor
     */
    if (cursor) {
      cursorQuery = { _id: { $lt: cursor } };
    }
    // Find the limit + 1 of notes in our DB, sorted newest to oldest.
    let notes = await models.Note.find(cursorQuery)
      .sort({ _id: -1 })
      .limit(limit + 1);

    /**
     * If the number of notes we find exceeds our limit
     * set hasNextPage to true and trim the notes to the limit
     */
    if (notes.length > limit) {
      hasNextPage = true;
      notes = notes.slice(0, -1);
    }
    // The new cursor will be the Mongo ObjectId of the last item in the feed array
    const newCursor = notes[notes.length - 1]._id;
    return {
      notes,
      cursor: newCursor,
      hasNextPage
    };
  }
};
