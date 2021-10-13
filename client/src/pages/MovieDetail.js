import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { detailAPI } from '../utils/DETAILAPI';
import { trailerAPI } from '../utils/YOUTUBEAPI';
import { useMutation } from '@apollo/client';
import { SAVE_MOVIE } from '../utils/mutations';
import SearchedMovies, { searchMovies, searchInput } from './SearchedMovies/index';

const [saveMovie, { error }] = useMutation(SAVE_MOVIE);

const handleSaveMovie = async (movieTitle) => {
    const movieToSave = SearchedMovies.find((movie) => movie.movieTitle === movieTitle);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
        return false;
    }

    try {
        const { data } = await saveMovie({
            variables: { movieData: { ...movieToSave } }
        });

        setSavedMovieTitles([...setSavedMovieTitles, movieToSave.movieTitle]);
    } catch (err) {
        console.error(err);
    }
};

try {
    const response = await detailAPI();

    if (!response.ok) {
        throw new Error('something went wrong!')
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

    
} catch (err) {
    console.error(err);
}

function MovieDetails(data) {
    return (
        <div>
            <div className="text-left">
                <img
                    alt={props.title}
                    className="img-fluid"
                    src={props.src}
                    style={{ margin: '0 auto' }}
                />

                {/* <Button
                    disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                    className='btn-block btn-info'
                    onClick={() => handleSaveMovie(book.bookId)}>
                    {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                      ? 'This book has already been saved!'
                      : 'Save this Book!'}
                </Button> */}

                <h3>Director(s): {props.director}</h3>
                <h3>Genre: {props.genre}</h3>
                <h3>Released: {props.released}</h3>
                <h3>Rated: {props.rated}</h3>
                <h3>Rating: {props.rating}</h3>
                <h3>Plot: {props.plot}</h3>
                <h3>Actors: {props.actors}</h3>

                <h2>Trailer: {props.trailer}</h2>
            </div>
        </div>
    );
}





export default MovieDetails;