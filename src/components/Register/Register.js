import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import landing from "../../assets/images/landing.webp";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, logoutUser } from "../../app/services/auth.service";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        FoodShare
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${landing})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Register() {
  const classes = useStyles();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const register = useSelector((state) => state.auth.registerUser);
  const dispatch = useDispatch();

  //reset login status
  useEffect(() => {
    dispatch(logoutUser());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (user.username && user.name && user.email && user.password) {
      dispatch(registerUser(user));
    }
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create your account
          </Typography>
          <form className={classes.form} name="form" onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              value={user.username}
              onChange={handleChange}
              className={
                "form-control" +
                (submitted && !user.username ? " is-invalid" : "")
              }
            />
            {submitted && !user.username && (
              <div className="invalid-feedback">Username is required</div>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="name"
              name="name"
              autoFocus
              value={user.name}
              onChange={handleChange}
              className={
                "form-control" + (submitted && !user.name ? " is-invalid" : "")
              }
            />
            {submitted && !user.username && (
              <div className="invalid-feedback">Username is required</div>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={user.email}
              onChange={handleChange}
              className={
                "form-control" + (submitted && !user.email ? " is-invalid" : "")
              }
            />
            {submitted && !user.email && (
              <div className="invalid-feedback">Email is required</div>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              className={
                "form-control" +
                (submitted && !user.password ? " is-invalid" : "")
              }
            />
            {/*submitted && !user.password && (
              <div className="invalid-feedback">Password is required</div>
            )}*/}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {" "}
              {register && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Register
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  {"Already have an Account? Login!"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Register;
