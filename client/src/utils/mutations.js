import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_MOVIE = gql`
  mutation addMovie($title: String!) {
    addMovie(title: $title) {
      _id
      title
      director
      comments {
        _id
        commentText
      }
    }
  }
`;

export const REMOVE_MOVIE = gql`
  mutation removeMovie($moiveId: ID!) {
    removeMovie(movieId: $movieId) {
      _id
      title
      director
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($movieId: ID!, $commentText: String!) {
    addComment(movieId: $movieId, commentText: $commentText) {
      _id
      title
      director
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($movieId: ID!, $commentId: ID!) {
    removeComment(movieID: $movieId, commentId: $commentId) {
      -id
      title
      director
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
