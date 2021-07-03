/**
 * Topic: Back-end Learning path
 * Subject: noSQL - Graph DB: GraphQL - Nodejs - Mongoose library - MongoDB - Apollo server express
 * Student name: Nguyễn Trường Thịnh
 * Thu Duc College Of Technology
 * Date: 30/ 6/ 2021
 */
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

// Run server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;

let notes = [
  { id: "1", content: "This is a note", author: "Thinh" },
  { id: "2", content: "this is another note", author: "Teo" },
  { id: "3", content: "Oh hey look, another note!", author: "Ti" },
];

// construct a schema using GraphQL's schema language
const typeDefs = gql`
  type Note {
    id: ID!
    content: String
    author: String
  }
  type Query {
    hello: String
    notes: [Note]
    note(id: ID): Note
  }
  type Mutation {
    newNote(content: String!): Note
  }
`;

// Add a resolver that will return a value to the user
// Provide resolver functions for our schema fields
const resolvers = {
  Query: {
    hello: () => "Hi, I am Thinh",
    notes: () => notes,
    note: (parent, args) => {
      return notes.find((note) => note.id === args.id);
    },
  },
  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: "Thinh",
      };
      notes.push(noteValue);
      return noteValue;
    },
  },
};

const app = express();

// connect to the db
db.connect(DB_HOST);

// integrate Apollo Server to server our graphql api.
const server = new ApolloServer({ typeDefs, resolvers });

// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: "/api" });

//app.get('/', (req, res) => res.send('*** Hi, I am Thinh ***'));
//app.listen(4000, () => console.log('listening on port 4000'));
//app.listen(port, () => console.log(`server running at http://localhost:${port}`));
app.listen({ port }, () =>
  console.log(
    `GraphQL server running at http://localhost:${port}${server.graphqlPath}`
  )
);
