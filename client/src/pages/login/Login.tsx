/* eslint-disable @typescript-eslint/no-explicit-any */
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../context/UserContext";
import { SignInRequest } from "../../model/api/SignInRequest";
import AuthApi from "../../api/AuthApi";
import {
  saveTokenToLocaleStorage,
  validateEmailRFC2822,
} from "../../auth_helpers/authhelpers";
import { UserFromToken } from "../../model/UserFromToken";
import {
  CLOSE_TIME,
  COLOR_1,
  GOOGLE_AUTH_URL,
  MIN_PASSWORD_LENGTH,
} from "../../constants/constants";
import {
  GoogleButton,
  LoginLink,
  LoginLinkContainer,
  LoginLinkSpan,
} from "./Login.styles";
import logo from "../../assets/web_neutral_sq_SI.svg";
import MySvgIcon from "./SvgIcon";

export default function Login() {
  const navigate = useNavigate();
  const { userModifier } = useContext(UserContext);

  const [signInRequest, setSignInRequest] = useState<SignInRequest>({
    email: "",
    password: "",
  });

  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  function onGoogleLoginClick() {
    window.location.href = GOOGLE_AUTH_URL;
  }

  const onLoginClicked = useCallback(async () => {
    try {
      const result = await AuthApi.signIn(signInRequest);
      saveTokenToLocaleStorage(result.data);
      const decodedAccessToken: UserFromToken = jwtDecode(
        result.data.access_token
      );

      userModifier({ ...decodedAccessToken });
      navigate("/");
    } catch (error: any) {
      let message: string;

      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        message = "Incorrect email or password";
      } else {
        message = "An error occured when trying to connect to server";
      }
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: CLOSE_TIME,
      });
    }
  }, [signInRequest, navigate, userModifier]);

  useEffect(() => {
    setIsEmailValid(validateEmailRFC2822(signInRequest.email));
  }, [signInRequest.email]);

  useEffect(() => {
    setIsPasswordValid(signInRequest.password.length >= MIN_PASSWORD_LENGTH);
  }, [signInRequest.password]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "rgba(255,255,255,0.3)",
        backgroundBlendMode: "overlay",
        backgroundImage: `url(/pexels-charlotte-may-5824877.jpg)`,
        backgroundSize: "cover",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          // opacity: "85%",
          backgroundColor: COLOR_1,
          width: "420px",
          padding: "40px 0",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack
          // marginTop={16}
          width={360}
          direction="column"
          spacing={2}
          alignItems="center"
        >
          <TextField
            fullWidth
            label="email"
            variant="outlined"
            required
            color="primary"
            value={signInRequest.email}
            error={!(isEmailValid || signInRequest.email.length === 0)}
            onChange={(e) =>
              setSignInRequest({
                ...signInRequest,
                email: e.currentTarget.value,
              })
            }
          />
          <TextField
            fullWidth
            label="password"
            variant="outlined"
            required
            color="primary"
            type={showPassword ? "text" : "password"}
            value={signInRequest.password}
            error={!(isPasswordValid || signInRequest.password.length === 0)}
            onChange={(e) =>
              setSignInRequest({
                ...signInRequest,
                password: e.currentTarget.value,
              })
            }
          />
          <Box sx={{ width: "100%" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
              }
              label="Show password"
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={onLoginClicked}
            disabled={!(isEmailValid && isPasswordValid)}
            sx={{ width: "120px" }}
          >
            Sign In
          </Button>
          <GoogleButton onClick={() => onGoogleLoginClick()} disabled={false}>
            {" "}
            Sign in with Google
          </GoogleButton>
          {/* <div
            style={{
              display: "inline-block",
              backgroundColor: "white",
            }}
          >
            <img src={logo} alt="" />
            WW
          </div>
          <Button onClick={() => onGoogleLoginClick()}>
            Sign in with Google
          </Button>
          <Button variant="outlined">
            <MySvgIcon />
          </Button> */}
          <LoginLinkContainer>
            <LoginLink>
              Do not have an account yet?
              <LoginLinkSpan to="/register">Sign up</LoginLinkSpan>{" "}
            </LoginLink>
          </LoginLinkContainer>
        </Stack>
      </Paper>
    </Box>
  );
}
