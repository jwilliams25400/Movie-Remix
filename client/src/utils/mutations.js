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

export const ADD_Movie = gql`
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
