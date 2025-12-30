import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://snkh-school-server-side.vercel.app",
}); 
// /http://localhost:5000 https://snkh-school-server-side.vercel.app
export const useAxiosSec = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  useEffect(() => {
    // add auth token for secure data fatching by requesting axios interseptor:
    axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        config.headers.authorization = `Bearer ${token}`;
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    // interseptor stop user for 401 and 403 status and logoutUser and navigate to login:
    axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          await logoutUser();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [logoutUser, navigate]);

  return axiosSecure;
};
