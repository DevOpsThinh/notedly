/**
 * Topic: Back-end Learning path
 * Subject: noSQL - Graph DB: GraphQL - Nodejs - Apollo Server Express - Mongoose library
 * Student name: Nguyễn Trường Thịnh
 * Thu Duc College Of Technology
 * Created At: 6/ 7/ 2021
 * 
 * Our Note nested queries resolver
*/
module.exports = {
    // Resolve the author info for a note when requested
    author: async (note, args, {models}) => {
        return await models.User.findById(note.author);
    },
    // Resolve the favoritedBy info for a note when requested
    favoritedBy: async (note, args, {models}) => {
        return await models.User.find({ _id: {$in: note.favoritedBy}});
    }
}