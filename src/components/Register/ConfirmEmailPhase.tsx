import {Button, Grid, Paper, Typography} from "@material-ui/core";
import { useEffect, useRef, useState } from "react";

import '../../styles/components/Register/ConfirmEmailPhase.scss';

import loading from '../../assets/loadings/small-secondary.loading.gif';

import confirmEmailApi from "../../apis/confirmEmail.api";
import { isResponseError } from "../../types/ResponseError.type";
import { Redirect } from "react-router-dom";
import paths from "../../configs/paths.config";

type ConfirmEmailProps = {
  password: string;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
};

const ConfirmEmailPhase = ({ password, userId, setUserId }: ConfirmEmailProps) => {
  const [error, setError] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmed, setIsConfirmed] = useState(false);

  const [digit1, setDigit1] = useState('');
  const [digit2, setDigit2] = useState('');
  const [digit3, setDigit3] = useState('');
  const [digit4, setDigit4] = useState('');
  const [digit5, setDigit5] = useState('');
  const [digit6, setDigit6] = useState('');

  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);
  const input5 = useRef(null);
  const input6 = useRef(null);

  useEffect(() => {
    if (input1 && input1.current) {
      input1.current.focus();
    }

    const handleReadCodeFromClipboard = async () => {
      const code = await navigator.clipboard.readText();
      if (code.length === 6 && parseInt(code).toString() !== 'NaN') {
        setDigit1(code.charAt(0));
        setDigit2(code.charAt(1));
        setDigit3(code.charAt(2));
        setDigit4(code.charAt(3));
        setDigit5(code.charAt(4));
        setDigit6(code.charAt(5));
        if (input6 && input6.current) {
          input6.current.focus();
        }
      }
    };

    window.addEventListener('focus', handleReadCodeFromClipboard)

    return () => window.removeEventListener('focus', handleReadCodeFromClipboard);
  }, []);

  const changeDigit = (value: string, setState: React.Dispatch<React.SetStateAction<string>>) => {
    if (parseInt(value).toString() === 'NaN' && value !== '') {
      return;
    }

    setState(value);
  };

  const switchInput = (keyCode: string, prev?: React.MutableRefObject<any>, next?: React.MutableRefObject<any>) => {
    if (keyCode === 'Backspace' && prev) {
      prev.current.focus();
    }
    else if (parseInt(keyCode).toString() !== 'NaN' && next) {
      next.current.focus();
    }
  };

  const validateData = (): string => {
    const token = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`;
    if (token.length !== 6) {
      return 'Confirm email\'s code is invalid!';
    }

    return token;
  };

  const onConfirmEmail = async () => {
    const result = validateData();

    if (result.length !== 6) {
      return setError(result);
    }

    setError('');

    setIsConfirming(true);
    const response = await confirmEmailApi(userId, {
      token: result,
      password: password,
    });

    if (isResponseError(response)) {
      setIsConfirming(false);
      let error = response.error;
      if (response.error.includes('expired')) {
        error = 'Confirm code is expired! Go back register form in 5 seconds';
        setTimeout(() => {
          setUserId('');
        }, 5000);
      }
      return setError(error);
    }

    setIsConfirming(false);
    setIsConfirmed(true);
  };

  if (confirmed) {
    return <Redirect to={paths.login} />
  }

  return (
    <div className="ConfirmEmail">
      <Grid container>
        <Grid item xs={11} sm={7} md={5} lg={3} className="ConfirmEmail__wrapper">
          <Paper className="ConfirmEmail__paper">
            <Typography variant="h4" className="title ConfirmEmail__title">Confirm email</Typography>

            { error && <Typography className="error" variant="body1">{error}</Typography> }

            <Typography className="ConfirmEmail__description" variant="body1">Please enter 6 digits code that we've sent</Typography>

            <Grid container justify="space-between">
              <Grid item>
                <input
                  className="ConfirmEmail__text-field"
                  tabIndex={-1}
                  maxLength={1}
                  value={digit1}
                  onChange={(e) => changeDigit(e.target.value, setDigit1)}
                  ref={input1}
                  onKeyUp={(e) => switchInput(e.key, undefined, input2)}
                />
              </Grid>

              <Grid item>
                <input
                  className="ConfirmEmail__text-field"
                  tabIndex={-1}
                  maxLength={1}
                  value={digit2}
                  onChange={(e) => changeDigit(e.target.value, setDigit2)}
                  ref={input2}
                  onKeyUp={(e) => switchInput(e.key, input1, input3)}
                />
              </Grid>

              <Grid item>
                <input
                  className="ConfirmEmail__text-field"
                  tabIndex={-1}
                  maxLength={1}
                  value={digit3}
                  onChange={(e) => changeDigit(e.target.value, setDigit3)}
                  ref={input3}
                  onKeyUp={(e) => switchInput(e.key, input2, input4)}
                />
              </Grid>

              <Grid item>
                <input
                  className="ConfirmEmail__text-field"
                  tabIndex={-1}
                  maxLength={1}
                  value={digit4}
                  onChange={(e) => changeDigit(e.target.value, setDigit4)}
                  ref={input4}
                  onKeyUp={(e) => switchInput(e.key, input3, input5)}
                />
              </Grid>

              <Grid item>
                <input
                  className="ConfirmEmail__text-field"
                  tabIndex={-1}
                  maxLength={1}
                  value={digit5}
                  onChange={(e) => changeDigit(e.target.value, setDigit5)}
                  ref={input5}
                  onKeyUp={(e) => switchInput(e.key, input4, input6)}
                />
              </Grid>

              <Grid item>
                <input
                  className="ConfirmEmail__text-field"
                  tabIndex={-1}
                  maxLength={1}
                  value={digit6}
                  onChange={(e) => changeDigit(e.target.value, setDigit6)}
                  ref={input6}
                  onKeyUp={(e) => switchInput(e.key, input5, undefined)}
                />
              </Grid>
            </Grid>

            <Button
              className="ConfirmEmail__button"
              variant="outlined"
              onClick={onConfirmEmail}
              disabled={isConfirming}
            >
              { !isConfirming ? 'CONFIRM EMAIL' : <img src={loading} alt="" height={23} /> }
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ConfirmEmailPhase;
