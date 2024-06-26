import axios, { AxiosError, AxiosRequestConfig } from "axios";
import apiBaseUrl from "../index";
import { getToken } from "@/utils/hooks/Auth/authService";


export const getAllWebsiteOrder = async () => {
  try {
    const apiUrl = `${apiBaseUrl}/getWebsiteAllOrderData`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const response = await axios.get(apiUrl, {
      headers: headers,
    });

    return response.data.data;
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

export const postOrderStatus = async (data: string) => {
  try {
    const apiUrl = `${apiBaseUrl}/approveWebsitePaymentByManager`;
    const token = await getToken();
    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const response = await axios.post(apiUrl, data, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};


export const getAllOrder = async () => {
  try {
    const apiUrl = `${apiBaseUrl}/getAllOrders`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const response = await axios.get(apiUrl, {
      headers: headers,
    });

    return response.data.data;
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


