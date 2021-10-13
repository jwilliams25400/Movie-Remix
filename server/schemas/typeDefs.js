const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    movies: [Movie]!
  }

  type Movie {
    _id: ID
    title: String!
    poster: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String!
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    movies(title: String): [Movie]
    movie(titleId: ID!): Movie
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addMovie(title: String!): Movie
    addComment(movieId: ID!, commentText: String!): Movie
    removeMovie(movieId: ID!): Movie
    removeComment(movieId: ID!, commentId: ID!): Movie
  }
`;

module.exports = typeDefs;
