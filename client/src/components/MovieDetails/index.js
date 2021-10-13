import React, {useState, useEffect} from 'react';
import Auth from '../../utils/auth';
import DETAILAPI from '../../utils/DETAILAPI';
import YOUTUBEAPI from '../../utils/YOUTUBEAPI';
import {useMutation} from '@apollo/client';
import {SAVE_MOVIE} from '../../utils/mutations'

const [saveMovie, {error}] = useMutation(SAVE_MOVIE);

function MovieDetails(props) {
    return (
        <div>
            <div className="text-left">
                <img
                    alt={props.title}
                    className="img-fluid"
                    src={props.src}
                    style={{ margin: '0 auto' }}
                />

                {/* <button
                    onClick={props.handleFormSubmit}
                    className="btn btn-primary"
                    type="sumbit"
                >
                Save Movie
                </button> */}

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