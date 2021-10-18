const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    newMovie: [ Movie ]
  }

  type Movie {
    movieId: String
    title: String!
    poster: String
      }

  
  type Auth {
    token: ID!
    user: User
  }

  input MovieInput {
    movieId: String!
    title: String!
    poster: String!
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
    removeMovie(movieId: ID!): Movie
    }
`;

module.exports = typeDefs;
