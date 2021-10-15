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
    commentAuthor: String!
    createdAt: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  input MovieInput {
    title: String!
    poster: String!
    comments: [Comment]
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
    addMovie(movieData: MovieInput!): User
    addComment(movieId: ID!, commentText: String!): Movie
    removeMovie(movieId: ID!): Movie
    removeComment(movieId: ID!, commentId: ID!): Movie
  }
`;

module.exports = typeDefs;
