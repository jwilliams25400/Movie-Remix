import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import Auth from '../utils/auth';
import { detailAPI } from '../utils/DETAILAPI';
import { trailerAPI } from '../utils/YOUTUBEAPI';
import { useMutation } from '@apollo/client';
import { ADD_MOVIE } from '../utils/mutations';
import SearchMovies from "./SearchedMovies";
import { YoutubeEmbed } from '../components/YoutubeVid/YoutubeEmbed';
// import { saveTitle, getSaveTitle } from "../utils/localStorage";


// const HandleSaveMovie = async (title) => {
//     const [addMovie, { error }] = useMutation(ADD_MOVIE);

//     const moviesToSave = SearchMovies.find(
//         (movie) => movie.title === title
//     );

//     const token = Auth.loggedIn() ? Auth.getToken() : null;
//     if (!token) {
//         return false;
//     }
//     try {
//         const { info } = await saveTitle({
//             variable: { movieData: { ...moviesToSave } },
//         });
//         console.log(info);

//         getSaveTitle([...saveTitle, moviesToSave.title]);

//     } catch (err) {
//         console.error(err);
//     }
// };

const DetailedMovies = async (title) => {
    const [details, setDetails] = useState([]);
    const [trailer, setTrailer] = useState([]);

    try {
        const response = await detailAPI();

        if (!response.ok) {
            throw new Error('failed to grab')
        }

        const { items } = await response.json();

        const movieData = items.map((movie) => ({
            movieId: movie.imdbID,
            title: movie.Title,
            director: movie.Director,
            genre: movie.Genre,
            released: movie.Released,
            rated: movie.Rated,
            rating: movie.Ratings[0].Value,
            plot: movie.Plot,
            actors: movie.Actors,
            poster: movie.Poster,
    }));

        setDetails(movieData);
    } catch (err) {
        console.error(err);
    }

    try {
        const response = await trailerAPI(SearchMovies);

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

    {
        details.map((movie) => {
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
                                {/* {Auth.loggedIn() && (
                                    // <Button
                                    //     disabled={savedmovieIds?.some((savedBookId) => savedBookId === book.bookId)}
                                    //     className='btn-block btn-info'
                                    //     onClick={() => handleSaveMovie(book.bookId)}>
                                    //     {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                                    //         ? 'This book has already been saved!'
                                    //         : 'Save movie Book!'}
                                    // </Button>
                                    // <button disabled={saveTitle?.some(
                                    //     (saveTitle) => saveTitle === movie.title)}
                                    //     className="btn-block"
                                    //     onClick={() => HandleSaveMovie(movie.title)}>
                                    //     {saveTitle?.some((saveTitle) =>
                                    //         saveTitle === movie.title)
                                    //         ? "Movie has been saved previously!"
                                    //         : "Save this Movie"}
                                    // </button>
                                )} */}
                            </Card.Body>
                        </Card>
                        {trailer.map((trailer) => {
                            return (
                                <div>
                                    <h1>Movie Trailer</h1>
                                    <YoutubeEmbed embedId='`${trailer.trailer}`' />
                                </div>
                            )
                        })}
                    </div>
                </div>
            );
        })
    };
};
export default DetailedMovies;