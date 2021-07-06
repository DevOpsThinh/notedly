/**
 * Topic: Back-end Learning path
 * Subject: noSQL - Graph DB: GraphQL - Nodejs - Apollo Server Express - Mongoose library
 * Student name: Nguyễn Trường Thịnh
 * Thu Duc College Of Technology
 * Created At: 3/ 7/ 2021
 * Updated At: 4/ 7/ 2021: Adding the user model
 * 
 * Combine our models into a single JS module --> index.js
*/
const Note = require('./note');
const User = require('./user');

const models = {
    Note,
    User
};

module.exports = models;