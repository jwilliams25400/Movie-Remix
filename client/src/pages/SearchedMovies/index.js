import React, { useState, useEffect } from "react";
import { searchAPI } from "../../utils/POSTERAPI";
import { SearchForm } from "../../components/SearchForm";

import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { SAVE_MOVIE } from "../../utils/mutations";

const SearchedMovies = () => {
  const [searchedMovies, setSearchMovies] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  const [addMovieTitle, setAddMovieTitle] = useState
  (getAddMovieTitle());

  const [saveMovie, { error }] = useMutation(SAVE_MOVIE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return "Please enter a movie title";
    }

    try {
      const response = await searchAPI(searchInput);

      if (!response) {
        throw new Error("unable to find movie");
      }

      const { items } = await response.json();

      const movieData = items.map((movie) => ({
        title: items.Search[i].Title,
        poster: movie.Search[i].Poster,
      }));

      setSearchMovies(movieData);
      setSearchInput("");
    } catch (err) {
      console.log("unable to load movies");
    }
  };

  const handleSaveMovie = async (title) => {

    const moviesToSave = searchedMovies.find(
      (movie) => movie.title === title
    );

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const { info } = await saveMovie({
        variable: { movieData: { ...moviesToSave } },
      });
      console.log(info);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="jumbotron fuild">
        <div className="container">
          <h1>Search for Movies!</h1>
          <form className="row" onSubmit={handleFormSubmit}>
            <div className="col-md-5">
              <input
                className="form-control"
                type="text"
                size="lg"
                placeholder="Search for a movie"
                value={searchInput}
              />
              <div className="col-12">
                <buton type="submit" class="btn btn-primary">
                  Search
                </buton>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="search-movie container">
        <h3>
          {searchedMovies.length
            ? `Viewing ${searchedMovies.lenght} Movies:`
            : "Search for a movie to begin"}
        </h3>
        <div className="row movie">
          <div className="col-3">
            {searchedMovies.map((movie) => {
              return (
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <div div className="img-container">
                    {movie.poster ? (
                      <img
                        className="movie-poster"
                        src={movie.poster}
                        alt={`The Poster for ${movie.title}`}
                        variant="top"
                      />
                    ) : null}
                  </div>
                  <button onClick={() => handleSaveMovie(movie.movie.title)}>
                    {saveMovie?.some((saveMovie))}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchedMovies;
