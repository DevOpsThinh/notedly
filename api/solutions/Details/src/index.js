/**
 * Topic: Back-end Learning path
 * Subject: noSQL - Graph DB: GraphQL - Nodejs - Mongoose library - MongoDB - Apollo server express
 * Student name: Nguyễn Trường Thịnh
 * Thu Duc College Of Technology
 * created At: 30/ 6/ 2021
 * Updated At: 3/ 7/ 2021: Adding the DB, CRUD pattern
 * Updated At: 4/ 7/ 2021: Adding Authentication module
*/

///------------------------------------------------------------///
///               Third-party & Utilities                     ///
///----------------------------------------------------------///
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
// Import JWT module
const jwt = require('jsonwebtoken');
// Import Express Helmet middleware
const helmet = require('helmet');
// Import Expressjs Cross-Origin Resource Sharing middleware
const cors = require('cors');
// Import graphql's depth-limit and validation-complexity packages 
const depthLimit = require('graphql-depth-limit');
const {createComplexityLimitRule} = require('graphql-validation-complexity');

require('dotenv').config();

///------------------------------------------------------------///
///               Local module imports                        ///
///----------------------------------------------------------///

// Import the db
const db = require('./db');
// DB models into our Apollo server express app code. 
const models = require('../api/solutions/Details/src/models');
// construct a schema using GraphQL's schema language
const typeDefs = require('./schema');
// Add a resolver that will return a value to the user
const resolvers = require('../api/solutions/Details/src/resolvers');

// Run server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;
// store the DB_HOST value as a varible
const DB_HOST = process.env.DB_HOST;
// connect to the db
db.connect(DB_HOST);

const app = express();

// Add the security middleware at the top of the stack
// app.use(helmet());
// Enable CORS
app.use(cors());

///------------------------------------------------------------///
///     Integrate Apollo Server to server our graphql api     ///  
///----------------------------------------------------------///

/**
 * Verify the validity of Token
 * Get the user info from a JWT
*/
const getUser = token => {
    if (token) {
        try {
            // Return the user information from the token
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            // If there's a problem with the token, throw an error
            throw new Error('Session invalid!');
        }
    }
};


// Apollo server setup
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // include validationRules
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],

    context: ({req}) => {
        // Get the user token from the headers
        const token = req.headers.authorization;
        // Try to retrieve a user with the token
        const user = getUser(token);
        // // Let's log the user to the console
        // console.log(user);
        // Add the db models and the user to the context
        return {models, user};
    }
});

// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({app, path: '/api'});

app.listen({port}, () => console.log(
    `GraphQL server running at http://localhost:${port}${server.graphqlPath}`
));