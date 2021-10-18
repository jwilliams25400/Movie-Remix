import React, { useState, useEffect } from "react";
import { searchAPI } from "../utils/POSTERAPI";
import { detailAPI } from "../utils/DETAILAPI";
import { NavLink, Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { ADD_MOVIE } from "../utils/mutations";
import { saveMovieIds, getSavedMovieIds } from "../utils/localStorage";
import {
  Form,
  Card,
  Button,
  Col,
  Jumbotron,
  Container,
  CardColumns,
} from "react-bootstrap";
import { ChatEngineWrapper, ChatSocket, ChatFeed } from "react-chat-engine";
const chatEng = process.env.REACT_APP_CHATENGINE

const SearchMovies = () => {
  const [searchedMovies, setSearchedMovies] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

  const [addMovie, { error }] = useMutation(ADD_MOVIE);

  const [details, setDetails] = useState([]);

  useEffect(() => {
    return () => saveMovieIds(savedMovieIds);
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("handleFormSubmit");
    if (!searchInput) {
      return "Please enter a movie title";
    }

    try {
      console.log("search Input: ", searchInput);
      const response = await searchAPI(searchInput);
      console.log(response);
      if (!response) {
        throw new Error("unable to find movie");
      }

      const { Search: items } = await response.json();
      console.log(items);

      const movieData = items.map((movie) => ({
        title: movie.Title,
        poster: movie.Poster,
        movieId: movie.imdbID
      }));

      setSearchedMovies(movieData);
      setSearchInput("");
    } catch (err) {
      console.log(err);
      console.log("unable to load movies");
    }
  };
  const handleDetail = async (title) => {
    console.log(title);
    // const movieDetail = await detailAPI(title);

    try {
      const response = await detailAPI(title);
      console.log(response);
      if (!response.ok) {
        throw new Error('failed to grab')
      }

      const itemsTwo = await response.json();
      console.log(itemsTwo);
      // const data = Array.from(itemsTwo);
      // const data = itemsTwo.split("");
      // const movieDetail = Object.keys(itemsTwo).map((movie) => ({
      //   movieId: movie.imdbID,
      //   title: movie.Title,
      //   director: movie.Director,
      //   genre: movie.Genre,
      //   released: movie.Released,
      //   rated: movie.Rated,
      //   rating: movie.Ratings,
      //   plot: movie.Plot,
      //   actors: movie.Actors,
      //   poster: movie.Poster,
      // }));
      // console.log(movieDetail);
      const movieDetail = [itemsTwo]

      setDetails(movieDetail);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveMovie = async (movieId) => {
    const moviesToSave = searchedMovies.find(
      (movie) => movie.movieId === movieId
    );

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const { data } = await addMovie({
        variables: { movieData: { ...moviesToSave } },
      });
      setSavedMovieIds([...savedMovieIds, moviesToSave.movieId]);
    } catch (err) {
      console.log(err);
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
              <Card key={movie.movieId} border="dark">
                <Col xs={12} md={6}>
                  <Card.Title>{movie.title}</Card.Title>
                  <Container>
                    {movie.poster ? (
                      <Card.Img
                        className="movie-poster"
                        src={movie.poster}
                        alt={`The Poster for ${movie.title}`}
                        variant="top"
                      />
                    ) : null}
                  </Container>
                </Col>
                {details.map((movie) => {
                  return (
                    <div>
                      <div className="text-left">
                        <Card key={movie.movieId} border='dark'>
                          <Col xs={12} md={6}>
                            {movie.image ? (
                              <Card.Img src={movie.image} alt={`The Poster for ${movie.title}`} variant='top' />
                            ) : null}
                            <Card.Body>
                              <Card.Title>{movie.Title}</Card.Title>
                              <p className='small'>Director(s): {movie.Director}</p>
                              <Card.Text>
                               {` Plot: ${movie.Plot}
                                Actors: ${movie.Actors}
                                Genre: ${movie.Genre}
                                Released: ${movie.Released}
                                Rated: ${movie.Rated}
                                `}
                              </Card.Text>

                            </Card.Body>
                          </Col>
                        </Card>
                        {/* {trailer.map((trailer) => {
                            return (
                                <div>
                                    <h1>Movie Trailer</h1>
                                    <YoutubeEmbed embedId='`${trailer.trailer}`' />
                                </div>
                            )
                        })} */}
                      </div>
                    </div>
                  );
                })}
                {
                  Auth.loggedIn() && (
                    <div>
                      <Button
                        disabled={savedMovieIds?.some(
                          (savedMovieId) => savedMovieId === movie.movieId
                        )}
                        className="btn-block"
                        onClick={() => handleSaveMovie(movie.movieId)}
                      >
                        {savedMovieIds?.some(
                          (savedMovieId) => savedMovieId === movie.movieId
                        )
                          ? "Movie has been saved previously!"
                          : "Save this Movie"}
                      </Button>
                      <Button
                        onClick={() => handleDetail(movie.title)}
                        className="btn-block"
                      >
                        Details
                      </Button>
                    </div>
                  )
                }
              </Card>
            );
          })}
        </CardColumns>
      </Container>
      <div>
        <Col xs={11} ms={8} md={6} lg={4}>
          <ChatEngineWrapper>
            <ChatSocket
            projectID="a21f0c74-83f4-4fa8-becc-d97091a24144"
            chatID={chatEng}
            userName={localStorage.getItem("username")}
            userSecret={localStorage.getItem("password")}
            />

            <ChatFeed activeChat={chatEng} />
          </ChatEngineWrapper>
        </Col>

      </div>
    </>
  );
};

export default SearchMovies;
