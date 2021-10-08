const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    movie: [Movie]!
  }

  type Movie {
    _id: ID
    title: String!
    director: String
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
    movies(username: String): [Movie]
    movie(titleId: ID!): Movie
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addMovie(title: String!): Movie
    addComment(movieId: ID!, commentText: String!): Movie
    removeMovie(movieId: ID!): Movie
    removeComment(thoughtId: ID!, commentId: ID!): Movie
  }
`;

module.exports = typeDefs;
