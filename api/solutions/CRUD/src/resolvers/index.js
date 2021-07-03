/**
 * Topic: Back-end Learning path
 * Subject: noSQL - Graph DB: GraphQL - Nodejs - Apollo Server Express - Mongoose library
 * Student name: Nguyễn Trường Thịnh
 * Thu Duc College Of Technology
 * Date: 3/ 7/ 2021
 * 
 * Combine our resolvers into a single JS module --> index.js
*/
const Query = require('./query');
const Mutation = require('./mutation');
const {GraphQLDateTime} = require('graphql-iso-date');

module.exports = {
    Query,
    Mutation,
    DateTime: GraphQLDateTime
};