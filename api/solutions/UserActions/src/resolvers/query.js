/**
 * Topic: Back-end Learning path
 * Subject: noSQL - Graph DB: GraphQL - Nodejs - Apollo Server Express - Mongoose library
 * Student name: Nguyễn Trường Thịnh
 * Thu Duc College Of Technology
 * Created At: 3/ 7/ 2021
 * Updated At: 6/ 7/ 2021: Adding user queries: user's info, all users, current user.
 * 
 * Our queries resolver
*/
module.exports = {
    notes: async (parent, args, { models }) => {
        return await models.Note.find()
    },
    note: async (parent, args, { models }) => {
        return await models.Note.findById(args.id);
    },
    user: async (parent, {username}, {models}) => {
        // Find a user given their username
        return await models.User.findOne({username});
    },
    users: async (parent, args, {models}) => {
        // Find all users
        return await models.User.find({});
    },
    me: async (parent, args, {models, user}) => {
        // Find a user given the current user context
        return await models.User.findById(user.id);
    }
};