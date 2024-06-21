import axios, { AxiosError, AxiosRequestConfig } from "axios";
import apiBaseUrl from "../index";
import { getToken } from "@/utils/hooks/Auth/authService";
import { usersInformation, usersputInformation } from "./type";

export const getAllUsers = async () => {
  try {
    const apiUrl = `${apiBaseUrl}/getAllUsers`;
    const token = await getToken();

    const headers = {
      Authorization: token,
    };
    const response = await axios.get(apiUrl, { headers });
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

export const postusers = async (newData: any) => {
  try {
    const apiUrl = `${apiBaseUrl}/addUser`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    };

    // const postData = {
    //         name: newData?.name,
    //         email: newData?.email,
    //         password: newData?.id,
    // };

    const response = await axios.post(apiUrl, newData, { headers });
    if (response.data.error === false) {
      // await getAllSalesMan()
    } else {
      // alert("Successfully added salesman");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("Axios Error:", axiosError.code, axiosError.message);
      console.error("Axios Config:", axiosError.config);
    } else {
      console.error("Error during post request:", error);
    }
    throw error;
  }
};

export const putUsers = async (updatedData: any, userId: string) => {
  const payload = {
    ...updatedData,
    adminId: userId,
  };
  try {
    const apiUrl = `${apiBaseUrl}/updateUserById`;
    const token = await getToken();
    const headers = {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    };

    const response = await axios.put(apiUrl, payload, { headers });
    if (response.data.error === false) {
      // await getAllProductVariant();
    } else {
      // Handle the error case if needed
      // alert("Failed to update product variant");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("Axios Error:", axiosError.code, axiosError.message);
      console.error("Axios Config:", axiosError.config);
    } else {
      console.error("Error during put request:", error);
    }
    throw error;
  }
};

export const deleteUsers = async (users: string) => {
  try {
    const apiUrl = `${apiBaseUrl}/deleteUserByAdminId`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const requestData = {
      adminId: users,
    };

    const response = await axios.delete(apiUrl, { headers, data: requestData });
    if (response.data.error === false) {
      // await getAllSalesMan();
    } else {
      // Handle the error case if needed
      // alert("Failed to delete product variant");
    }

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("Axios Error:", axiosError.code, axiosError.message);
      console.error("Axios Config:", axiosError.config);
    } else {
      console.error("Error during delete request:", error);
    }
    throw error;
  }
};

export const putStatusChangeUsers = async (id: string, newStatus: string) => {
  try {
    const apiUrl = `${apiBaseUrl}/statusUserByAdminId`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const putData = {
      adminId: id,
      status: newStatus,
    };

    const response = await axios.put(apiUrl, putData, { headers });
    if (response.data.error === false) {
      // await getAllCategories();
    } else {
      // Handle the error case if needed
      // alert("Failed to update product variant");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("Axios Error:", axiosError.code, axiosError.message);
      console.error("Axios Config:", axiosError.config);
    } else {
      console.error("Error during put request:", error);
    }
    throw error;
  }
};

export const getUserById = async (user: any) => {
  try {
    const apiUrl = `${apiBaseUrl}/getUserDataById`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const data = {
      userId: user,
    };

    const response = await axios.post(apiUrl, data, {
      headers: headers,
    });

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
