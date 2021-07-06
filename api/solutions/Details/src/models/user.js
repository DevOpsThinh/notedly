/**
 * Topic: Back-end Learning path
 * Subject: noSQL - Graph DB: GraphQL - Nodejs - Apollo Server Express - Mongoose library
 * Student name: Nguyễn Trường Thịnh
 * Thu Duc College Of Technology
 * Created At: 4/ 7/ 2021
 * 
 * User model
*/
// 1. Require the mongoose lib
const mongoose = require('mongoose');

// 2. Define the user's db schema
const userSchema = new mongoose.Schema(
    // Adding functionality to our user schema as we go.
    {
        username: {
            type: String,
            required: true,
            index: {unique: true}
        },
        email: {
            type: String,
            required: true,
            index: {unique: true}
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String
        }
    },
    {
        // Assigns createdAt, updatedAt fields with a Date type
        timestamps: true
    }
);

// 3. Define the 'User' model with the Schema
const User = mongoose.model('User', userSchema);

// 4. Export the module
module.exports = User;