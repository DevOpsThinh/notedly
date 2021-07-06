/**
 * Topic: Back-end Learning path
 * Subject: noSQL - Graph DB: GraphQL - Nodejs - Apollo Server Express - Mongoose library
 * Student name: Nguyễn Trường Thịnh
 * Thu Duc College Of Technology
 * Created At: 3/ 7/ 2021
 * Updated At: 6/ 7/ 2021: Apply the cross-referencing to the data in our DB; Toggling Note favorites.
 * 
 * Note model
*/
// 1. Require the mongoose lib
const mongoose = require('mongoose');

// 2. Define the note's db schema
const noteSchema = new mongoose.Schema(
    // Adding functionality to our note schema as we go.
    {
        content: {
            type: String,
            require: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        favoriteCount: {
            type: Number,
            default: 0
        },
        favoritedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        // Assigns createdAt and updatedAt fields with a Date type
        timestamps: true
    }
);

// 3. Define the 'Note' model with the schema
const Note = mongoose.model('Note', noteSchema);

// 4. Export the module
module.exports = Note;