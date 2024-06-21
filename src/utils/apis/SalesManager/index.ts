import axios, { AxiosError, AxiosRequestConfig } from "axios";
import apiBaseUrl from "../index";
import { getToken } from "@/utils/hooks/Auth/authService";
import { SaleManagerPost, SaleManagerput } from "./type";

export const getAllSalesManager = async () => {
  try {
    const apiUrl = `${apiBaseUrl}/getAllSalesManagers`;
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

export const postSalesManager = async (newData: any) => {
  try {
    const apiUrl = `${apiBaseUrl}/createSalesManager`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    };

    // const postData = {
    //   name: newData?.name,
    //   email: newData?.email,
    //   password: newData?.id,
    //   status: newData?.status,
    // };

    const response = await axios.post(apiUrl, newData, { headers });
    if (response.data.error === false) {
      // await getAllSalesManager()
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

export const putSalesManager = async (updatedData: any) => {
  console.log("api", updatedData);
  try {
    const apiUrl = `${apiBaseUrl}/updateSalesManagerById`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    };

    // const putData = {
    //   firstName: updatedData.name,
    //   adminId: updatedData.id,
    // };

    const response = await axios.put(apiUrl, updatedData, { headers });
    if (response.data.error === false) {
      // await getAllSalesManager()
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
export const deleteSalesManager = async (salesman: string) => {
  try {
    const apiUrl = `${apiBaseUrl}/deleteSalesManagerById`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const requestData = {
      adminId: salesman,
    };

    const response = await axios.delete(apiUrl, { headers, data: requestData });
    if (response.data.error === false) {
      await getAllSalesManager();
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

export const putSubStatusChangeSalesManager = async (
  id: string,
  newStatus: string
) => {
  try {
    const apiUrl = `${apiBaseUrl}/statusSalesManagerById`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const putData = {
      adminId: id,
      status: newStatus,

      // Add any additional fields you need to update
    };
    //         {
    //     "valueId": "fd583aae-c077-4c4b-a382-317c8464d711",
    //     "valueName":"Red",
    //     "status":"active"

    // }

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
