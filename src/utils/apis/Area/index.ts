import axios, { AxiosError, AxiosRequestConfig } from "axios";
import apiBaseUrl from "../index";
import { getToken } from "@/utils/hooks/Auth/authService";
import { CityInformation } from "../City/type";


// create Area
export const postArea = async (formData) => {
  try {
    const apiUrl = `${apiBaseUrl}/createArea`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };
    const response = await axios.post(apiUrl, formData, { headers });
    if (response.data.error === false) {
    } else {
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


// getAllAreas
export const getAllAreas = async () => {
  try {
    const apiUrl = `${apiBaseUrl}/getAllAreas`;
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

// getAreaById
export const getAreaById = async (area: any) => {
  try {
    const apiUrl = `${apiBaseUrl}/getAreaById`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const data = {
      areaId: area,
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

// Update Area
export const putArea = async (updatedData: CityInformation) => {
  try {
    const apiUrl = `${apiBaseUrl}/updateArea`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const putData = {
      areaId: updatedData.id,
      areaName: updatedData.name,
    };

    const response = await axios.put(apiUrl, putData, { headers });
    if (response.data.error === false) {
    } else {
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

// DeleteArea
export const deleteArea = async (Area: string) => {
  try {
    const apiUrl = `${apiBaseUrl}/deleteAreaById`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const requestData = {
      areaId: Area,
    };

    const response = await axios.delete(apiUrl, { headers, data: requestData });
    if (response.data.error === false) {
    } else {
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

// putStatusChangeArea
export const putStatusArea = async (id: string, newStatus: string) => {
  try {
    const apiUrl = `${apiBaseUrl}/statusChangeByAreaId`;
    const token = await getToken();
    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };
    const putData = {
      areaId: id,
    };

    const response = await axios.put(apiUrl, putData, { headers });
    if (response.data.error === false) {
    } else {
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

// getAllActiveAreas
export const getAllActiveArea = async () => {
  try {
    const apiUrl = `${apiBaseUrl}/getAllActiveAreas`;
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
