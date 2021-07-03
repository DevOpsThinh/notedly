/**
 * Topic: Back-end Learning path
 * Subject: noSQL - Graph DB: GraphQL - Nodejs - Apollo Server Express - Mongoose library
 * Student name: Nguyễn Trường Thịnh
 * Thu Duc College Of Technology
 * Date: 3/ 7/ 2021
 * 
 * Combine our models into a single JS module --> index.js
*/
const Note = require('./note');

const models = {
    Note
};

module.exports = models;