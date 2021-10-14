import React, { useState, useEffect } from "react";
import { searchAPI } from "../../utils/POSTERAPI";
import { SearchForm } from "../../components/SearchForm";

import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { SAVE_MOVIE } from "../../utils/mutations";
import { saveTitle, getSaveTitle } from "../../utils/localStorage";

const SearchMovies = () => {

  const [searchedMovies, setSearchedMovies] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  const [saveTitle, setSaveTitle] = useState
  (getSaveTitle());

  const [saveMovie, { error }] = useMutation(SAVE_MOVIE);

  useEffect(() => {
    return() => saveTitle(saveTitle);
  })

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

      setSearchedMovies(movieData);
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
      const { info } = await saveTitle({
        variable: { movieData: { ...moviesToSave } },
      });
      console.log(info);

      setSaveTitle([...saveTitle, moviesToSave.title]);

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
                  <button disabled={saveTitle?.some(
                    (saveTitle) => saveTitle === movie.title)}
                  className="btn-block"
                  onClick={() => handleSaveMovie(movie.title)}>
                    {saveTitle?.some((saveTitle) =>
                    saveTitle === movie.title)
                    ? "Movie has been saved previously!"
                    : "Save this Movie"}
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

export default SearchMovies;
