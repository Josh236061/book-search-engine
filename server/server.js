const { ApolloServer } = require("apollo-server-express")
const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';

const express = require('express');
// const path = require('path');
const db = require('./config/connection');
const {typeDefs} = require('./schemas')
const {resolvers} = require('./schemas');
const { User } = require("./models");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));

let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    introspection: true,
    typeDefs,
    resolvers,
    context: async({ req }) => {
      let token = req.query.token || req.headers.authorization;
      if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
      } else {
        return {user: null}
      }
      const {data} = jwt.verify(token, secret)
      const user = await User.findById(data._id)
      return {user};
    }
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({app, path: "/graphql"})
}

startServer();

app.listen(PORT, () => {
  console.log(`🌍 Now listening on localhost:${PORT}`);
})
