import React from "react";

import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_MOVIE } from "../utils/mutations";

import Auth from "../utils/auth";
import { removeMovieId } from "../utils/localStorage";

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeMovie, { error }] = useMutation(REMOVE_MOVIE);

  const userData = data?.me || {};
  console.log(userData);

  const handleDeleteBook = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeMovie({
        variables: { movieId },
      });

      removeMovieId(movieId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing Saved Movies!</h1>
        </Container>
      </Jumbotron>
      <div>
        <div>
          <Container style={{ maxWidth: "50" }}>
            <h2>
              {userData.newMovie.length
                ? `Viewing ${userData.newMovie.length} saved ${
                    userData.newMovie.length === 1 ? "movie" : "movies"
                  }:`
                : "You have no saved movies!"}
            </h2>
            <CardColumns>
              {userData.newMovie.map((movie) => {
                return (
                  <Card key={movie.movieId} border="dark">
                    {movie.poster ? (
                      <Card.Img
                        src={movie.poster}
                        alt={`The Poster for ${movie.title}`}
                        variant="top"
                      />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{movie.title}</Card.Title>
                      <Button
                        className="btn-block btn-danger"
                        onClick={() => handleDeleteBook(movie.movieId)}
                      >
                        Delete this Movie!
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
            </CardColumns>
          </Container>
          <div
            style={{
              marginLeft: "0",
              marginRight: "0",
              display: "flex",
              flexFlow: "row-wrap",
              flexGrow: "0",
              flexShrink: "0",
              alignItem: "normal",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "25",
                paddingLeft: "0",
                paddingRight: "0",
                height: "100vh",
                boxSizing: "border-box",
              }}
            >
              <div
                className="chat-groups"
                style={{
                  maxHeight: "100vh",
                  overflow: "hidden, scroll",
                  borderRight: "1px solid",
                  backgroundColor: "white",
                }}
              >
                <div
                  className="chat-container"
                  style={{
                    width: "100",
                    height: "100",
                    borderRadius: "0px 0px 24px 24px",
                  }}
                >
                  <div>
                    <div
                      className="new-chat"
                      style={{
                        padding: "16px 14px",
                        marginLeft: "0px",
                      }}
                    >
                      <div>
                        <div style={{ height: "0" }}>
                          <div
                            style={{
                              fontWeight: "500",
                              fontSize: "24px",
                              position: "relative",
                              top: "4px",
                              width: "50",
                            }}
                          >
                            My Groups
                          </div>
                        </div>

                        <div style={{ maxWidth: "100", textAlign: "right" }}>
                          <button
                            id="new-chat"
                            className="primary-btn"
                            style={{ height: "36px", fontSize: "15px", cursor:"pointer",
                          padding:"8px 16px",
                        borderRadius:"33px", backgroundColor:"blue" }}
                          ><span role="img" aria-label="plus">+</span></button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div></div>
                </div>
              </div>
            </div>

            <div className="sdfjosdfaoafoijjk"></div>
            <div className="sdfjosdfaoafoijjk"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
