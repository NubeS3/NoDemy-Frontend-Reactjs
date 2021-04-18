import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core"
import { useEffect, useState } from "react";
import { connect, ConnectedProps } from 'react-redux';
import { Link, Redirect, withRouter } from "react-router-dom";

import '../../styles/components/Login.scss';

import loading from '../../assets/loadings/small-secondary.loading.gif';

import { RootState } from "../../reducers/root.reducer";
import paths from "../../configs/paths.config";

import RouterProps from "../../types/RouterProps.type";
import {loginAdmin} from "../../reducers/adminAuthorization.reducer";

const mapStateToProps = (state: RootState) => ({
  adminToken: state.adminAuthorizationReducer.adminToken,
  loginError: state.adminAuthorizationReducer.error,
});

const mapDispatchToProps = {
  loginAdmin,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type AdminLoginProps = ConnectedProps<typeof connector> & RouterProps;

const AdminLogin = (props: AdminLoginProps) => {
  const [adminUsername, changeAdminUsername] = useState('');
  const [password, changePassword] = useState('');

  const [logging, setIsLogging] = useState(false);
  const [error, setError] = useState('');

  const validateData = () => {
    if (!adminUsername.trim()) {
      return 'Admin username is required!';
    }

    if (adminUsername.trim().length > 100) {
      return 'Admin username  can not contain more than 100 characters!';
    }

    return '';
  };

  const onHandleLoginAdmin = async () => {
    const errorMessage = validateData();
    setError(errorMessage);

    if (errorMessage) {
      return false;
    }

    setIsLogging(true);

    props.loginAdmin({
      adminUsername,
      password,
    });
  };

  useEffect(() => {
    setError(props.loginError);
    setIsLogging(false);
  }, [props.loginError]);

  if (props.adminToken) {
    return <Redirect to={paths.admin} />
  }

  return (
   // <PageWrapper links={links} history={props.history}>
      <div className="Login">
        <Grid container>
          <Grid item xs={11} sm={7} md={5} lg={3} className="Login__wrapper">
            <Paper className="Login__paper">
              <Typography variant="h4" className="title Login__title">Login</Typography>

              { error && <Typography className="error" variant="body1">{error}</Typography> }

              <TextField
                className="Login__text-field"
                label="Admin Username"
                variant="outlined"
                required
                value={adminUsername}
                onChange={(e) => changeAdminUsername(e.target.value)}
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
                onClick={onHandleLoginAdmin}
                disabled={logging}
              >
                { !logging ? 'Login' : <img src={loading} alt="loading..." height={23} /> }
              </Button>
            </Paper>

           
          </Grid>
        </Grid>
      </div>
   // </PageWrapper>
  );
};

export default withRouter(connector(AdminLogin));
