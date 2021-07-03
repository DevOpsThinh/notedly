/**
 * Topic: Back-end Learning path
 * Subject: noSQL - Graph DB: GraphQL - Nodejs - Apollo Server Express - Mongoose library
 * Student name: Nguyễn Trường Thịnh
 * Thu Duc College Of Technology
 * Date: 3/ 7/ 2021
 * 
 * Our mutations resolver
*/
module.exports = {
    newNote: async (parent, args, {models}) => {
        return await models.Note.create({
            content: args.content,
            author: 'Truong Thinh'
        });
    },
    deleteNote: async (parent, {id}, {models}) => {
        try {
            await models.Note.findOneAndRemove({ _id: id});
            return true;
        } catch (err) {
            return false;
        }
    },
    updateNote: async (parent, {content, id}, {models}) => {
        return await models.Note.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    content
                }
            },
            {
                new: true
            }
        );
    },
}