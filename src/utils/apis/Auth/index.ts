import UserData from "@models/UserData";
import axios, { AxiosError } from "axios";
import apiBaseUrl from "../index";

export const SignInAPI = async (userData: UserData) => {
  try {
    const apiUrl = `${apiBaseUrl}/login`;
    const response = await axios.post(apiUrl, {
      email: userData.username,
      password: userData.password,
    });

    localStorage.setItem("userInfo", JSON.stringify(response?.data?.data));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("Axios Error:", axiosError.code, axiosError.message);
      console.error("Axios Config:", axiosError.config);
    } else {
      console.error("Error during login:", error);
    }
    throw error;
  }
};
