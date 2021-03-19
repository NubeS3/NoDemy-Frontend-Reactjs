import React, { useState } from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

import { isResponseError } from "../../types/ResponseError.type";

import '../../styles/components/Register/RegisterPhase.scss';

import loading from '../../assets/loadings/small-secondary.loading.gif';
import registerApi from "../../apis/register.api";

type RegisterPhaseProps = {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
};

const RegisterPhase = ({ setPassword, setUserId }: RegisterPhaseProps) => {
  const [email, changeEmail] = useState('');
  const [fullname, changeFullname] = useState('');
  const [password, changePassword] = useState('');
  const [confirmPassword, changeConfirmPassword] = useState('');

  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  const validateData = () => {
    if (!email.trim()) {
      return 'Email is required!';
    }

    if (email.trim().length > 100) {
      return 'Email must not contain more than 100 characters!';
    }

    if (!isEmail(email.trim())) {
      return 'Email is not valid!';
    }

    if (!fullname.trim()) {
      return 'Fullname is required!';
    }

    if (fullname.trim().length > 64) {
      return 'Fullname must not contain more than 64 characters!';
    }

    if (!password.trim()) {
      return 'Password is required!';
    }

    if (password.trim().length < 8) {
      return 'Password must contain at least 8 characters!';
    }

    if (confirmPassword !== password) {
      return 'Confirm password must be the same as password!';
    }

    return '';
  };

  const onRegister = async () => {
    setIsRegistering(true);

    const validateResult = validateData();
    setError(validateResult);
    if (validateResult) {
      return setIsRegistering(false);
    }

    const response = await registerApi({
      email: email,
      fullname: fullname,
    });

    if (isResponseError(response)) {
      setError(response.error);
      return setIsRegistering(false);
    }

    setPassword(password);
    setUserId(response.data.user._id);
  };

  return (
    <div className="Register">
      <Grid container>
        <Grid item xs={11} sm={7} md={5} lg={3} className="Register__wrapper">
          <Paper className="Register__paper">
            <Typography variant="h4" className="title Register__title">Register</Typography>

            {error && <Typography className="error" variant="body1">{error}</Typography>}

            <TextField
              className="Register__text-field"
              label="Email"
              variant="outlined"
              type="email"
              required
              value={email}
              onChange={(e) => changeEmail(e.target.value)}
            />

            <TextField
              className="Register__text-field"
              label="Fullname"
              variant="outlined"
              type="text"
              required
              value={fullname}
              onChange={(e) => changeFullname(e.target.value)}
            />

            <TextField
              className="Register__text-field"
              label="Password"
              variant="outlined"
              type="password"
              required
              value={password}
              onChange={(e) => changePassword(e.target.value)}
            />

            <TextField
              className="Register__text-field"
              label="Confirm password"
              variant="outlined"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => changeConfirmPassword(e.target.value)}
            />

            <Button
              className="Register__button"
              variant="contained"
              disabled={isRegistering}
              onClick={onRegister}
            >
              {!isRegistering ? 'REGISTER' : <img src={loading} alt="" height={23} />}
            </Button>
          </Paper>

          <Paper className="Register__paper">
            <Typography
              className="Register__description"
              variant="body1"
            >
              Already have an account? <Link className="Register__description__link" to="/login">Login here</Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default RegisterPhase;
