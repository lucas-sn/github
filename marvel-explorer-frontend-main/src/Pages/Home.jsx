import React from "react";

import { useHistory } from "react-router-dom";

import Header from "../Components/Header";

import Characters from "../Images/Characters.jpg";
import Collections from "../Images/Collections.jpg";
import Favorites from "../Images/Favorites.jpg";

import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: "60vh",
  },
  cardContent: {
    backgroundColor: "#504a4a",
    color: "white",
  },
});

function Home(props) {
  const history = useHistory();
  const classes = useStyles();
  return (
    <>
      <Header />
      <Grid
        style={{ minHeight: "calc(100vh - 64px)" }}
        item
        xs={12}
        spacing={2}
        container
        justify="center"
        alignContent="center"
      >
        <Grid item xs={3}>
          <Card
            className={classes.root}
            onClick={() => history.push(`/collections`)}
          >
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={Collections}
                title="Contemplative Reptile"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Coleções
                </Typography>
                <Typography variant="body1" component="h4">
                  Veja todas as coleções
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card
            className={classes.root}
            onClick={() => history.push(`/characters`)}
          >
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={Characters}
                title="Contemplative Reptile"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Personagens
                </Typography>
                <Typography variant="body1" component="h4">
                  Encontre todos os personagens
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card className={classes.root} onClick={() => history.push(`/fav`)}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={Favorites}
                title="Contemplative Reptile"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Favoritos
                </Typography>
                <Typography variant="body1" component="h4">
                  Acesse seus favoritos
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
