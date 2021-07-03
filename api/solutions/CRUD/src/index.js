/**
 * Topic: Back-end Learning path
 * Subject: noSQL - Graph DB: GraphQL - Nodejs - Mongoose library - MongoDB - Apollo server express
 * Student name: Nguyễn Trường Thịnh
 * Thu Duc College Of Technology
 * Date: 30/ 6/ 2021
*/
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

require('dotenv').config();

// Local module imports
const db = require('./db');
// DB models into our Apollo server express app code. 
const models = require('./models');
// construct a schema using GraphQL's schema language
const typeDefs = require('./schema');
// Add a resolver that will return a value to the user
const resolvers = require('./resolvers');

// Run server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;
// store the DB_HOST value as a varible
const DB_HOST = process.env.DB_HOST;

const app = express();

// connect to the db
db.connect(DB_HOST);

// integrate Apollo Server to server our graphql api.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        // Add the db's models to the context
        return {models};
    }
});

// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({app, path: '/api'});

//app.get('/', (req, res) => res.send('*** Hi, I am Thinh ***'));
//app.listen(4000, () => console.log('listening on port 4000'));
//app.listen(port, () => console.log(`server running at http://localhost:${port}`));
app.listen({port}, () => console.log(
    `GraphQL server running at http://localhost:${port}${server.graphqlPath}`
));