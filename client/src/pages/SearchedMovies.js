import React, { useState, useEffect } from "react";
import { searchAPI } from "../utils/POSTERAPI";
import { NavLink } from "react-router-dom";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { ADD_MOVIE } from "../utils/mutations";
import { saveMovieIds, getSavedMovieIds } from "../utils/localStorage";
import { Form, Card, Button, Col, Jumbotron, Container, CardColumns } from "react-bootstrap"

const SearchMovies = () => {

  const [searchedMovies, setSearchedMovies] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

  const [addMovie, { error }] = useMutation(ADD_MOVIE);

  useEffect(() => {
    return () => saveMovieIds(savedMovieIds);
  })

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
        variables: { movieData: { ...moviesToSave } }
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

      <Container>
        <h3>
          {searchedMovies.length
            ? `Viewing ${searchedMovies.length} Movies:`
            : "Search for a movie to begin"}
        </h3>
        <CardColumns>
          {searchedMovies.map((movie) => {
            return (
              <Card key={movie.movieId} border='dark'>
                <NavLink to="/MovieDetail" className="detail-btn">
                  <a href="">
                    <Card.Title>{movie.title}</Card.Title>
                    <Container>
                      {movie.poster ? (
                        <Card.Img className="movie-poster" src={movie.poster} alt={`The Poster for ${movie.title}`} variant="top" />
                      ) : null}
                    </Container></a></NavLink>
                  {Auth.loggedIn() && (
                    <Button disabled={savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)}
                      className="btn-block"
                      onClick={() => handleSaveMovie(movie.movieId)}>
                      {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
                        ? "Movie has been saved previously!"
                        : "Save this Movie"}
                    </Button>
                  )}
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchMovies;
