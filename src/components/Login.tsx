import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core"
import { useEffect, useState } from "react";
import { connect, ConnectedProps } from 'react-redux';
import { Link, Redirect, withRouter } from "react-router-dom";
import isEmail from 'validator/lib/isEmail';

import '../styles/components/Login.scss';

import loading from '../assets/loadings/small-secondary.loading.gif';
import googleLogo from '../assets/google/g-logo.png';

import { loginWithNodemy, loginWithGoogle } from '../reducers/authorization.reducer';
import { RootState } from "../reducers/root.reducer";
import paths from "../configs/paths.config";

import PageWrapper from "./common/PageWrapper";
import { NavBarLink } from "./common/NavBar";
import RouterProps from "../types/RouterProps.type";

const mapStateToProps = (state: RootState) => ({
  loginError: state.authorizationReducer.error,
  refreshToken: state.authorizationReducer.refreshToken,
});

const mapDispatchToProps = {
  loginWithNodemy,
  loginWithGoogle,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type LoginProps = ConnectedProps<typeof connector> & RouterProps;

const Login = (props: LoginProps) => {
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');

  const [logging, setIsLogging] = useState(false);
  const [error, setError] = useState('');

  const validateData = () => {
    if (!email.trim()) {
      return 'Email is required!';
    }

    if (email.trim().length > 100) {
      return 'Email can not contain more than 100 characters!';
    }

    if (!isEmail(email.trim())) {
      return 'Email is invalid!';
    }

    if (password.trim().length < 8) {
      return 'Unable to login!';
    }

    return '';
  };

  const onHandleLoginWithNodemy = async () => {
    const errorMessage = validateData();
    setError(errorMessage);

    if (errorMessage) {
      return false;
    }

    setIsLogging(true);

    props.loginWithNodemy({
      email,
      password,
    });
  };

  const onHandleLoginWithGoogle = async () => {
    setIsLogging(true);
    props.loginWithGoogle();
  };

  useEffect(() => {
    setError(props.loginError);
    setIsLogging(false);
  }, [props.loginError]);

  if (props.refreshToken) {
    return <Redirect to={paths.base} />
  }

  const links: Array<NavBarLink> = [{
    name: 'Home',
    url: paths.base,
  }, {
    name: 'Login',
    url: paths.login,
  }];

  return (
    <PageWrapper links={links} history={props.history}>
      <div className="Login">
        <Grid container>
          <Grid item xs={11} sm={7} md={5} lg={3} className="Login__wrapper">
            <Paper className="Login__paper">
              <Typography variant="h4" className="title Login__title">Login</Typography>

              { error && <Typography className="error" variant="body1">{error}</Typography> }

              <TextField
                className="Login__text-field"
                label="Email"
                variant="outlined"
                type="email"
                required
                value={email}
                onChange={(e) => changeEmail(e.target.value)}
              />

              <TextField
                className="Login__text-field"
                label="Password"
                variant="outlined"
                type="password"
                required
                value={password}
                onChange={(e) => changePassword(e.target.value)}
              />

              <Button
                className="Login__button"
                variant="contained"
                onClick={onHandleLoginWithNodemy}
                disabled={logging}
              >
                { !logging ? 'Login' : <img src={loading} alt="loading..." height={23} /> }
              </Button>

              <Typography className="Login__description Login__description--margin">or</Typography>

              <Button
                className="Login__google-button"
                variant="contained"
                disabled={logging}
                onClick={onHandleLoginWithGoogle}
              >
                <img src={googleLogo} alt="G" height={23} style={{ marginRight: 24 }} /> Sign in with Google
              </Button>
            </Paper>

            <Paper className="Login__paper">
              <Typography
                className="Login__description"
                variant="body1"
              >
                New to Nodemy? <Link className="Login__description__link" to="/register">Register here</Link>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </PageWrapper>
  );
};

export default withRouter(connector(Login));
