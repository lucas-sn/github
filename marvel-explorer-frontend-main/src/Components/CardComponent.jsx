import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

function CardComponent(props) {
  const [open, setOpen] = useState(false);
  function getImage(image) {
    // console.log(image, `${image.path}` + `.${image.extension}`); //eslint-disable-line
    return `${image.path}` + `.${image.extension}`; //eslint-disable-line
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item xs={2} style={{ marginLeft: 20, marginTop: 15 }}>
      <Card onClick={handleClickOpen} style={{ height: 300 }}>
        <CardActionArea style={{ height: 100 }}>
          <CardMedia
            style={{ height: 230, width: 250 }}
            image={getImage(props.opt.thumbnail)}
            title="Contemplative Reptile"
          />
          <CardContent style={{ margin: -10 }}>
            <Typography gutterBottom style={{ fontSize: 14 }}>
              {props.type === "collection" && props.opt.title}
              {props.type === "character" && props.opt.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* dialog */}
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">
              {props.type === "collection" && props.opt.title}
              {props.type === "character" && props.opt.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <Grid container direction="row">
            {props.type === "collection" && props.opt.characters && (
              <Grid item xs={2} style={{ marginTop: 50, padding: 20 }}>
                <Divider />
                Personagens:
                {props.opt.characters?.["items"].map((opt) => (
                  <ListItem key={`${opt["resourceURI"]}`}>
                    {opt["name"]}
                  </ListItem>
                ))}
              </Grid>
            )}
            {props.type === "collection" && props.opt.creators && (
              <Grid item xs={2} style={{ marginTop: 50, padding: 20 }}>
                <Divider />
                Criadores:
                {props.opt.creators?.["items"].map((opt) => (
                  <ListItem key={`${opt["resourceURI"]}`}>
                    {opt["name"]}
                  </ListItem>
                ))}
              </Grid>
            )}
            {props.type === "collection" && props.opt.prices && (
              <Grid
                item
                xs={2}
                style={{ marginTop: 50, padding: 20 }}
                onClick={() => console.log(props.opt.prices[0]["price"])}
              >
                <Divider />
                Preço:
                <ListItem>U$ {props.opt.prices[0]["price"]}</ListItem>
              </Grid>
            )}
            {props.type === "character" && props.opt.description && (
              <Grid
                item
                xs={4}
                style={{ marginTop: 50, padding: 20 }}
                onClick={() => console.log(props.opt.prices[0]["price"])}
              >
                <Divider />
                Descrição:
                <ListItem>{props.opt.description}</ListItem>
              </Grid>
            )}
            {props.type === "character" && props.opt.series && (
              <Grid item xs={2} style={{ marginTop: 50, padding: 20 }}>
                <Divider />
                Series:
                {props.opt.series?.["items"].map((opt) => (
                  <ListItem key={`${opt["resourceURI"]}`}>
                    {opt["name"]}
                  </ListItem>
                ))}
              </Grid>
            )}
            {props.type === "character" && props.opt.stories && (
              <Grid item xs={2} style={{ marginTop: 50, padding: 20 }}>
                <Divider />
                Stories:
                {props.opt.stories?.["items"].map((opt) => (
                  <ListItem key={`${opt["resourceURI"]}`}>
                    {opt["name"]}
                  </ListItem>
                ))}
              </Grid>
            )}
          </Grid>
        </List>
      </Dialog>
    </Grid>
  );
}
export default CardComponent;
