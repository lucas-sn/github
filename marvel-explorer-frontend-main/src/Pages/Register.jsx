import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import { Avatar, Button, Grid, Paper, TextField } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import apiMarvel from "../services/api";

import { BASE_URL } from "../const";

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

function Register(props) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const history = useHistory();

  function tryRegister() {
    const param = { username: username, password: password, email: email };
    apiMarvel()
      .post(`${BASE_URL}/register`, { ...param })
      .then((response) => {
        alert(`username:${username}, password:${password}`); // eslint-disable-next-line
        if (200 <= response.status < 300) return history.push("/");
      })
      .catch((response) => {
        // eslint-disable-next-line
        if (400 <= response.status < 500) {
          alert(response);
          console.log(response);
        }
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
            <h2>Sign In</h2>
          </Grid>
          <TextField
            label="Login"
            placeholder="Enter Login"
            fullWidth
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="E-mail"
            placeholder="E-mail"
            fullWidth
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            placeholder="Enter Password"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            disabled={
              !password.length > 0 || !username.length > 0 || !email.length > 0
            }
            className={classes.button}
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => tryRegister()}
          >
            Sign in
          </Button>
        </Paper>
      </Grid>
    </>
  );
}

export default Register;
