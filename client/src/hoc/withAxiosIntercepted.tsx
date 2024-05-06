/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { InternalAxiosRequestConfig } from "axios";
import { UserContext } from "../context/UserContext";
import { getJwtToken } from "../auth_helpers/authhelpers";

export const authorizedApi = axios.create();

export function withAxiosIntercepted<T extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<T>
) {
  return function AxiosIntercepted(props: T) {
    const navigate = useNavigate();
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const { userModifier, currentUser } = useContext(UserContext);

    useEffect(() => {
      axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        return {
          ...config,
          baseURL: import.meta.env.VITE_API_URL,
        };
      });

      authorizedApi.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
          const token: string | null = await getJwtToken();

          if (token) {
            if (config?.headers) {
              config.headers.Authorization = `Bearer ${token}`;
              config.headers.accept = "*/*";
            }
          } else {
            userModifier(null);
          }
          return {
            ...config,
            baseURL: import.meta.env.VITE_API_URL,
          };
        }
      );

      authorizedApi.interceptors.response.use(
        (response) => {
          return response; // .data
        },
        (error) => {
          if (error.response.status === 401) {
            localStorage.clear();
            userModifier(null);
          }
          return Promise.reject(error);
        }
      );

      setIsInitialized(true);
    }, [navigate, userModifier, currentUser]);

    return isInitialized ? <Component {...props} /> : <></>;
  };
}
