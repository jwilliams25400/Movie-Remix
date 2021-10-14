import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import Auth from '../utils/auth';
import { detailAPI } from '../utils/DETAILAPI';
import { trailerAPI } from '../utils/YOUTUBEAPI';
import { useMutation } from '@apollo/client';
import { SAVE_MOVIE } from '../utils/mutations';
import { searchedMovies, saveTitle } from './SearchedMovies';
import { YoutubeEmbed } from '../components/YoutubeVid/YoutubeEmbed';

const [saveMovie, { error }] = useMutation(SAVE_MOVIE);

const handleSaveMovie = async (title) => {

    const moviesToSave = searchedMovies.find(
      (movie) => movie.title === title
    );

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const { info } = await saveTitle({
        variable: { movieData: { ...moviesToSave } },
      });
      console.log(info);

      setSaveTitle([...saveTitle, moviesToSave.title]);

    } catch (err) {
      console.error(err);
    }
  };

const detailedMovies = () => {
    const [details, setDetails] = useState([]);
    const [trailer, setTrailer] = useState([]);

    try {
        const response = await detailAPI(searchedMovies);

        if (!response.ok) {
            throw new Error('failed to grab')
        }

        const { items } = await response.json();

        const movieData = items.map((movie) => ({
            movieId: movie.id,
            title: movie.title,
            director: movie.director,
            genre: movie.genre,
            released: movie.released,
            rated: movie.rated,
            rating: movie.ratings[0].value,
            plot: movie.plot,
            actors: movie.actors,
            poster: movie.poster,
        }));
        
        setDetails(movieData);
    } catch (err) {
        console.error(err);
    }

    try {
        const response = await trailerAPI(searchedMovies);

        if (!response.ok) {
            throw new Error('failed to load')
        }

        const { newItem } = await response.json();

        const trailerData = newItem.map((trailer) => ({
            trailer: trailer.items.id.videoid
        }));
        setTrailer(trailerData);
    } catch (err) {
        console.log(err);
    }

        {details.map((movie) => {
        return (
            <div>
                <div className="text-left">
                <Card key={movie.movieId} border='dark'>
                {movie.image ? (
                  <Card.Img src={movie.image} alt={`The Poster for ${movie.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <p className='small'>Director(s): {movie.director}</p>
                  <Card.Text>
                    Plot: {movie.plot}
                    Actors: {movie.actors}
                    Genre: {movie.genre}
                    Released: {movie.released}
                    Rated: {movie.rated}
                    Rating: {movie.rating[0].value}
                  </Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                    disabled={savedmovieIds?.some((savedBookId) => savedBookId === book.bookId)}
                    className='btn-block btn-info'
                    onClick={() => handleSaveMovie(book.bookId)}>
                    {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                      ? 'This book has already been saved!'
                      : 'Save movie Book!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
                  {trailer.map((trailer) => {
                      return (
                        <div>
                            <h1>Movie Trailer</h1>
                            <YoutubeEmbed embedId = '`${trailer.trailer}`' />
                        </div>
                      )
                  })}
                </div>
            </div>
        );
    })};
};
export default detailedMovies;