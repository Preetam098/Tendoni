import axios, { AxiosError, AxiosRequestConfig } from "axios";
import apiBaseUrl from "../index";
import { getToken } from "@/utils/hooks/Auth/authService";
import { CityInformation } from "../City/type";

export const postCity = async (formData) => {
  try {
    const apiUrl = `${apiBaseUrl}/createCity`;
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

export const getAllCity = async () => {
  try {
    const apiUrl = `${apiBaseUrl}/getAllCities`;
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

export const getCityById = async (city: any) => {
  try {
    const apiUrl = `${apiBaseUrl}/getCityById`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const data = {
      cityId: city,
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

export const putCity = async (updatedData: CityInformation) => {
  try {
    const apiUrl = `${apiBaseUrl}/updateCity`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const putData = {
      cityId: updatedData.id,
      cityName: updatedData.name,
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

export const deleteCity = async (City: string) => {
  try {
    const apiUrl = `${apiBaseUrl}/deleteCityById`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const requestData = {
      cityId: City,
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

export const putStatusChangeCity = async (id: string, newStatus: string) => {
  try {
    const apiUrl = `${apiBaseUrl}/statusChangeByCityId`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const putData = {
      cityId: id,
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

export const getAllActiveCity = async () => {
  try {
    const apiUrl = `${apiBaseUrl}/getAllActiveCities`;
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
