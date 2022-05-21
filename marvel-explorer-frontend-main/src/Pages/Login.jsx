import React, { useState, useContext } from "react";

import { useHistory } from "react-router-dom";

import {
  Avatar,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import apiMarvel from "../services/api";

import { BASE_URL } from "../const";

import StoreContext from "../store/Context";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 10,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  },
  avatar: {
    backgroundColor: "#e23636",
  },
  button: {
    marginTop: 8,
  },
}));

function Login(props) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setToken } = useContext(StoreContext);
  const history = useHistory();

  function tryLogin() {
    const param = { username: username, password: password };
    apiMarvel()
      .post(`${BASE_URL}/login`, { ...param })
      .then((response) => {
        setToken(response.data);
        return history.push("/home");
      })
      .catch((response) => {
        console.log(response);
      });
  }

  return (
    <>
      <Grid>
        <Paper className={classes.paper} elevation={10}>
          <Grid align="center">
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Log In</h2>
          </Grid>
          <TextField
            label="Login"
            placeholder="Enter Login"
            fullWidth
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            placeholder="Enter Password"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            disabled={!password.length > 0 || !username.length > 0}
            className={classes.button}
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => tryLogin()}
          >
            Log in
          </Button>
          <Typography>
            Do you have an account?
            <Link href="/register">Sign in</Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
}

export default Login;
