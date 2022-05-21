import React, { useEffect, useState, useContext } from "react";
import Header from "../Components/Header";
import CardComponent from "../Components/CardComponent";
import axios from "axios";
import StoreContext from "../store/Context";
import { BASE_URL } from "../const";
import { useHistory } from "react-router-dom";
import { CircularProgress, Grid, Paper } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

function Collections(props) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState();

  const { token } = useContext(StoreContext);
  const history = useHistory();

  useEffect(() => {
    const param = { page: page };

    const apiMarvel = () =>
      axios.create({
        baseURL: BASE_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token["access_token"],
        },
      });

    setLoading(true);

    apiMarvel()
      .get(`${BASE_URL}/marvel/comics`, { params: { ...param } })
      .then((response) => {
        setLoading(false);
        setCollections(response.data);
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
                    defaultPage={page}
                    siblingCount={6}
                    boundaryCount={3}
                    onChange={handlePage}
                    count={collections?.pages && collections.pages}
                  />
                </Paper>
              </Grid>
              {collections?.results &&
                Object.values(collections.results).map((collection) => {
                  return (
                    <CardComponent
                      key={collection.id}
                      opt={collection}
                      type={"collection"}
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

export default Collections;
