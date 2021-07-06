/**
 * Topic: Back-end Learning path
 * Subject: noSQL - Graph DB: GraphQL - Nodejs - Mongoose library - MongoDB - Apollo server express
 * Student name: Nguyễn Trường Thịnh
 * Thu Duc College Of Technology
 * Created At: 3/ 7/ 2021
 * Updated At: 4/ 7/ 2021: Adding the user schema.
 * Updated At: 6/ 7/ 2021: Adding user queries: user's info, all users, current user; Toggling Note favorites
 * 
 * Our schema
*/
const { gql } = require('apollo-server-express');

module.exports = gql`

    scalar DateTime

    type Note {
        id: ID!
        content: String!
        author: User!
        favoriteCount: Int!
        favoritedBy: [User]
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        avatar: String
        notes: [Note!]!
        favorites: [Note!]!
    }

    type Query {
        notes: [Note!]!
        note(id: ID!): Note!
        user(username: String!): User
        users: [User!]!
        me: User!
    }

    type Mutation {
        newNote(content: String!): Note!
        updateNote(id: ID!, content: String!): Note!
        deleteNote(id: ID!): Boolean!

        signUp(username: String!, email: String!, password: String!): String!
        signIn(username: String, email: String, password: String!): String!
        
        toggleFavorite(id: ID!): Note!
    }
`;