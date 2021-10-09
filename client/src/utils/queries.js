import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      Movie {
        _id
        title
        director
      }
    }
  }
`;

export const QUERY_MOVIES = gql`
  query movies($title: String!){
   movie(title: $title) {
      _id
      title
      director
    }
    }
  
`;

export const QUERY_SINGLE_MOVIE = gql`
  query getSingleMovie($movieId: ID!) {
    movie(movieId: $movieId) {
      _id
      title
      director
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      movie {
        _id
        title
        director
        comments {
          _id
          commentText
          commentAuthor
          createdAt
        }
      }
    }
  }
`;
