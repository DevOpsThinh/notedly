/**
 * Topic: Back-end Learning path
 * Subject: noSQL - Graph DB: GraphQL - Nodejs - Mongoose library - MongoDB - Apollo server express
 * Student name: Nguyễn Trường Thịnh
 * Thu Duc College Of Technology
 * Date: 3/ 7/ 2021
 * 
 * Our schema
*/
const { gql } = require('apollo-server-express');

module.exports = gql`

    scalar DateTime

    type Note {
        id: ID!
        content: String!
        author: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type Query {
        notes: [Note!]!
        note(id: ID!): Note!
    }

    type Mutation {
        newNote(content: String!): Note!
        updateNote(id: ID!, content: String!): Note!
        deleteNote(id: ID!): Boolean!
    }
`;