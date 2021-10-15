import React, { useState, useEffect } from "react";
import { searchAPI } from "../utils/POSTERAPI";
import { NavLink } from "react-router-dom";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { ADD_MOVIE } from "../utils/mutations";
import { saveTitle, getSaveTitle } from "../utils/localStorage";
import { Form, Card, Button, Col, Jumbotron, Container } from "react-bootstrap"

const SearchMovies = () => {

  const [searchedMovies, setSearchedMovies] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  const [savedMovieIds, setSavedMovieIds] = useState(getSaveTitle());

  const [addMovie, { error }] = useMutation(ADD_MOVIE);

  // useEffect(() => {
  //   // return () => saveMovie(saveTitle);
  // })

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("handleFormSubmit")
    if (!searchInput) {
      return "Please enter a movie title";
    }

    try {
      console.log("search Input: ", searchInput)
      const response = await searchAPI(searchInput);
      console.log(response)
      if (!response) {
        throw new Error("unable to find movie");
      }

      const { Search: items } = await response.json();
      console.log(items);

      const movieData = items.map((movie) => ({
        title: movie.Title,
        poster: movie.Poster,
      }));

      setSearchedMovies(movieData);
      setSearchInput("");
    } catch (err) {
      console.log(err);
      console.log("unable to load movies");
    }
  };

  const handleSaveMovie = async (movieId) => {
    const moviesToSave = searchedMovies.find((movie) => movie.movieId === movieId);

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const { data } = await addMovie({
        variables: { movieData: { ...moviesToSave}}
      })
      setSavedMovieIds([...savedMovieIds, moviesToSave.movieId]);

    } catch (err) {
      console.log(err)
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="jumbotron">
        <Container>
          <h1>Search for Movies!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={5}>
                <Form.Control
                  name="form-control"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)} 
                  type="text"
                  size="lg"
                  placeholder="Search for a movie"
                />
              </Col>
              <Col xs={12} md={3}>
                <Button type="submit" className="btn btn-primary">
                  Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>
      <div className="search-movie container">
          <h3>
            {searchedMovies.length
              ? `Viewing ${searchedMovies.length} Movies:`
              : "Search for a movie to begin"}
          </h3>
          <div className="row movie">
            <div className="col-3">
              {searchedMovies.map((movie) => {
                return (
                  <div className="card-body">
                    <NavLink to="/MovieDetail" className="detail-btn">
                      <a href="">
                        <h5 className="card-title">{movie.title}</h5>
                        <div div className="img-container">
                          {movie.poster ? (
                            <img
                              className="movie-poster"
                              src={movie.poster}
                              alt={`The Poster for ${movie.title}`}
                              variant="top" />
                          ) : null}
                        </div></a></NavLink>
                    <button disabled={savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)}
                      className="btn-block"
                      onClick={() => handleSaveMovie(movie.movieId)}>
                      {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
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
