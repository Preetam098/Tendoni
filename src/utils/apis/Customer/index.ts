import axios, { AxiosError, AxiosRequestConfig } from "axios";
import apiBaseUrl from "../index";
import { getToken } from "@/utils/hooks/Auth/authService";

export const getAllWebsiteCustomer = async () => {
  try {
    const apiUrl = `${apiBaseUrl}/getWebsiteAllCustomerData`;
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

export const getEcommerceCustomerAddress = async (customerID: string) => {

  try {
    const apiUrl = `${apiBaseUrl}/getAllCustomerAddress`;
    const token = await getToken();
    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };
    const data = {
      customerId: customerID,
    };

    const response = await axios.post(apiUrl, data, {
      headers: headers,
    });

    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllCustomer = async () => {
  try {
    const apiUrl = `${apiBaseUrl}/getAllCustomers`;
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

export const getAllCustomerAddress = async (customerID: string) => {
  try {
    const apiUrl = `${apiBaseUrl}/getCustomerByUserId`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const data = {
      userId: customerID,
    };

    const response = await axios.post(apiUrl, data, {
      headers: headers,
    });

    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    console.error("Axios Error:", axiosError.code, axiosError.message);
    console.error("Axios Config:", axiosError.config);
  } else {
    console.error("Error:", error);
  }
  throw error;
};