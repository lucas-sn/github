import React, { useState, useEffect, useContext } from "react";
import Header from "../Components/Header";
import CardComponent from "../Components/CardComponent";
import axios from "axios";
import StoreContext from "../store/Context";
import { BASE_URL } from "../const";
import { useHistory } from "react-router-dom";
import { CircularProgress, Grid, Paper } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

function Characters(props) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState();

  const { token } = useContext(StoreContext);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    const param = { page: page };

    const apiMarvel = () =>
      axios.create({
        baseURL: BASE_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token["access_token"],
        },
      });

    apiMarvel()
      .get(`${BASE_URL}/marvel/characters`, { params: { ...param } })
      .then((response) => {
        setLoading(false);
        setCharacters(response.data[0]);
      })
      .catch((response) => {
        history.push(`/`);
      });
  }, [page, token, history]);

  const handlePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Header />
      {loading ? (
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{ height: "calc(100vh - 64px)", width: "100vw" }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{
            height: "calc(100vh - 64px)",
            width: "100vw",
            overflowY: "auto",
          }}
        >
          <Grid style={{ height: "95%", width: "98%", borderRadius: 20 }}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12}>
                <Paper>
                  <Pagination
                    style={{
                      marginLeft: 55,
                      marginTop: 25,
                      alignItems: "center",
                    }}
                    color="primary"
                    variant="outlined"
                    siblingCount={6}
                    boundaryCount={3}
                    onChange={handlePage}
                    count={characters?.pages && characters.pages}
                  />
                </Paper>
              </Grid>
              {characters?.results &&
                Object.values(characters.results).map((character) => {
                  return (
                    <CardComponent
                      key={character.id}
                      opt={character}
                      type={"character"}
                    />
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default Characters;
