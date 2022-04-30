import React, { useState, useEffect } from "react";
import { Link } from "@mui/icons-material";
import {
  Avatar,
  Container,
  TextField,
  CssBaseline,
  Alert,
  Grid,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import GoogleLogin from "react-google-login";
import { useFormik } from "formik";
import * as yup from "yup";
import { signInUser } from "../../store/actions/userAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary?.main,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column !important",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  google: {
    borderRadius: theme.spacing(2),
    margin: theme.spacing(1),
  },
}));
const Login = ({ user, signInUser }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMess, setErrorMess] = useState("");

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate("/");
    }
  }, []);
  //   Validation Schemas
  // Validation Schema for Email and Password
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  // Setting Formik validation library
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      const emailStatic = values.email.split("@")[0];
      let loggedId = null;
      if (emailStatic === "admin") {
        loggedId = 1;
      } else {
        loggedId = 2;
      }
      setIsLoading(true);
      signInUser({ ...values, id: loggedId })
        .then((data) => {
          if (!data.validState) setErrorMess("Invalid Username Or Password");
          else {
            setErrorMess("");
            navigate(state?.path || "/dashboard");
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    },
  });

  // Google Validation Schemas
  const responseGoogle = (response) => {
    if (response.error) {
      setErrorMess("Invalid Google Account");
      setIsLoading(false);
    } else {
      signInUser({
        id: 2,
        email: response.profileObj.email,
        name: response.profileObj.name,
        googleAuth: true,
      })
        .then((data) => {
          if (!data.validState) setErrorMess("Invalid Username Or Password");
          else {
            toast.success("Google Logged in Successful");
            setErrorMess("");
            navigate(state?.path || "/dashboard");
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Grid container spacing={2} align="center" justifyContent="center">
        <Grid item xs={12} sm={12} md={12} className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h4">Login</Typography>
        </Grid>
        <Grid item xs={12}>
          <form
            onSubmit={formik.handleSubmit}
            className={classes.form}
            noValidate
          >
            {errorMess && <Alert severity="error">{errorMess}</Alert>}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              placeholder="User Email Id"
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="*******"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              autoComplete="current-password"
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={isLoading}
              color="primary"
              endIcon={<KeyboardArrowRight />}
              className={classes.submit}
            >
              Log in
            </LoadingButton>
          </form>
          <GoogleLogin
            clientId="25860778518-lt39cmgjc3s1na7pfc564gdn2bilqljq.apps.googleusercontent.com"
            buttonText="Sign In With Google"
            className={classes.google}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </Grid>
      </Grid>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://material-ui.com/">
            Airline BNB
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth,
});

const mapDispatchToProps = {
  signInUser,
};

Login.propTypes = {
  user: PropTypes.object.isRequired,
  signInUser: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
