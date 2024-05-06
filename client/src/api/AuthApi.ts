import axios from "axios";
import { SignInRequest } from "../model/api/SignInRequest";
import { RegisterRequest } from "../model/api/RegisterRequest";
import { SignInResponse } from "../model/api/SignInResponse";

export default class AuthApi {
  static signIn = async (request: SignInRequest) =>
    axios.post<SignInResponse>(`/api/v1/auth/authenticate`, request);

  static signUp = async (
    reCaptchaToken: string | null,
    request: RegisterRequest
  ) =>
    axios.post<SignInResponse>(`/api/v1/auth/register`, request, {
      params: {
        "g-recaptcha-response": reCaptchaToken,
      },
    });
}
