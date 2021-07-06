/**
 * Topic: Back-end Learning path
 * Subject: noSQL - Graph DB: GraphQL - Nodejs - Apollo Server Express - Mongoose library
 * Student name: Nguyễn Trường Thịnh
 * Thu Duc College Of Technology
 * Created At: 3/ 7/ 2021
 * Updated At: 6/ 7/ 2021: Adding: Note - User nested queries.
 * 
 * Combine our resolvers into a single JS module --> index.js
*/
const Query = require('./query');
const Mutation = require('./mutation');
const Note = require('./note');
const User = require('./user');
// uses graphql-iso-date package
const {GraphQLDateTime} = require('graphql-iso-date');

module.exports = {
    Query,
    Mutation,
    Note,
    User,
    DateTime: GraphQLDateTime
};