/* eslint-disable @typescript-eslint/no-explicit-any */

// captcha name: my_plants_app
// key: 6LfTL50pAAAAAEZCVYCqRm5hxfbsr7e_ygF9kSSw

import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { UserContext } from "../../context/UserContext";
import { RegisterRequest } from "../../model/api/RegisterRequest";
import AuthApi from "../../api/AuthApi";
import { UserFromToken } from "../../model/UserFromToken";
import {
  saveTokenToLocaleStorage,
  validateEmailRFC2822,
} from "../../auth_helpers/authhelpers";
import {
  CLOSE_TIME,
  COLOR_1,
  GOOGLE_AUTH_URL,
  MIN_PASSWORD_LENGTH,
} from "../../constants/constants";
import { Role } from "../../model/api/Role";
import {
  RegisterLink,
  RegisterLinkContainer,
  RegisterLinkSpan,
} from "./Register.styles";
import { GoogleButton } from "../login/Login.styles";

const roles: Role[] = Object.keys(Role).map(
  (key) => Role[key as keyof typeof Role]
);

export default function Register() {
  const navigate = useNavigate();
  const { userModifier } = useContext(UserContext);
  const [registerRequest, setRegisterRequest] = useState<RegisterRequest>({
    username: "",
    email: "",
    password: "",
    role: null,
  });

  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isRequestValid, setIsRequestValid] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<number>(2);

  const reCaptchaSiteKey: string | undefined = import.meta.env
    .VITE_RECAPTCHA_SITE_KEY;
  const [reCaptchaToken, setReCaptchaToken] = useState<string | null>(null);

  // useEffect(() => {
  //   console.log("reCaptchaToken: ", reCaptchaToken);
  // }, [reCaptchaToken]);

  function onGoogleLoginClick() {
    window.location.href = GOOGLE_AUTH_URL;
  }

  const onRegisterClicked = useCallback(async () => {
    try {
      const result = await AuthApi.signUp(reCaptchaToken, registerRequest);

      saveTokenToLocaleStorage(result.data);

      const decodedAccessToken: UserFromToken = jwtDecode(
        result.data.access_token
      );
      userModifier({ ...decodedAccessToken });

      // setReCaptchaToken(null);
      navigate("/");
    } catch (error: any) {
      let message: string;
      if (error.response && error.response.status === 400) {
        message = "Incorrect user data provided";
      } else if (
        error.response.status === 401 &&
        error.response.data.message === "Captcha verification failed"
      ) {
        message = "Captcha verification failed";
      } else if (error.response.status === 401) {
        message = "User with such e-mail aready exists";
      } else {
        message = "An error occured when trying to connect to server";
      }
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: CLOSE_TIME,
      });
    }
  }, [reCaptchaToken, registerRequest, userModifier, navigate]);

  useEffect(() => {
    setIsEmailValid(validateEmailRFC2822(registerRequest.email));
  }, [registerRequest.email]);

  useEffect(() => {
    const isValid: boolean =
      !!registerRequest.username &&
      isEmailValid &&
      registerRequest.password.length >= MIN_PASSWORD_LENGTH &&
      repeatedPassword === registerRequest.password &&
      !!registerRequest.role;

    setIsRequestValid(isValid);
  }, [registerRequest, isEmailValid, repeatedPassword]);

  const onRoleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (+event.target.value < 2) {
      setRegisterRequest((prevState) => ({
        ...prevState,
        role: roles[+event.target.value],
      }));
    } else {
      setRegisterRequest((prevState) => ({ ...prevState, role: null }));
    }
    setSelectedRole(+event.target.value);
  };

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
          // opacity: "0%",
          backgroundColor: COLOR_1,
          width: "420px",
          padding: "40px 0",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack width={360} direction="column" spacing={2} alignItems="center">
          <TextField
            fullWidth
            label="user name"
            variant="outlined"
            required
            color="primary"
            value={registerRequest.username}
            onChange={(e) =>
              setRegisterRequest({
                ...registerRequest,
                username: e.currentTarget.value,
              })
            }
          />
          <TextField
            fullWidth
            label="email"
            variant="outlined"
            required
            color="primary"
            value={registerRequest.email}
            error={!(isEmailValid || registerRequest.email.length === 0)}
            onChange={(e) =>
              setRegisterRequest({
                ...registerRequest,
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
            value={registerRequest.password}
            error={
              registerRequest.password.length < MIN_PASSWORD_LENGTH &&
              registerRequest.password.length > 0
            }
            onChange={(e) =>
              setRegisterRequest({
                ...registerRequest,
                password: e.currentTarget.value,
              })
            }
          />

          <TextField
            fullWidth
            label="repeat password"
            variant="outlined"
            required
            color="primary"
            type={showPassword ? "text" : "password"}
            value={repeatedPassword}
            error={
              !(
                registerRequest.password === repeatedPassword ||
                repeatedPassword.length === 0
              )
            }
            onChange={(e) => setRepeatedPassword(e.target.value)}
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
          <Box minHeight={80} width="100%">
            <TextField
              color="primary"
              label="select role"
              variant="outlined"
              required
              select
              value={selectedRole}
              onChange={onRoleChange}
              fullWidth
              inputProps={{
                readOnly: false,
              }}
            >
              <MenuItem value={2} disabled={false}>
                Select role
              </MenuItem>
              {roles.map((role, index) => (
                <MenuItem key={role} value={index}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <ReCAPTCHA
            sitekey={reCaptchaSiteKey!}
            onChange={(token) => setReCaptchaToken(token)}
            hl="en"
            size="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={onRegisterClicked}
            disabled={!(isRequestValid && reCaptchaToken)}
            // disabled={!isRequestValid}
            sx={{ width: "120px" }}
          >
            Sign up
          </Button>
          <GoogleButton disabled={false} onClick={() => onGoogleLoginClick()}>
            {" "}
            Sign up with Google
          </GoogleButton>
          <RegisterLinkContainer>
            <RegisterLink>
              Already have an account?
              <RegisterLinkSpan to="/login">Sign in</RegisterLinkSpan>{" "}
            </RegisterLink>
          </RegisterLinkContainer>
        </Stack>
      </Paper>
    </Box>
  );
}
