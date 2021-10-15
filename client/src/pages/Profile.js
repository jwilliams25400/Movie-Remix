import React from 'react';

import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_MOVIE } from '../utils/mutations';

import Auth from '../utils/auth';
import { removeMovieId } from '../utils/localStorage';

const Profile = () => {

  const { loading, data } = useQuery(QUERY_ME);
  const [ removeMovie, {error} ] = useMutation(REMOVE_MOVIE);

  const userData = data?.me || {};
  console.log(userData)

  const handleDeleteBook = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeMovie ({
        variables: { movieId }
      });

      removeMovieId(movieId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing Saved Movies!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.newMovie.length
            ? `Viewing ${userData.newMovie.length} saved ${userData.newMovie.length === 1 ? 'movie' : 'movies'}:`
            : 'You have no saved movies!'}
        </h2>
        <CardColumns>
          {userData.newMovie.map((movie) => {
            return (
              <Card key={movie.movieId} border='dark'>
                {movie.poster ? <Card.Img src={movie.poster} alt={`The Poster for ${movie.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(movie.movieId)}>
                    Delete this Movie!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default Profile;
