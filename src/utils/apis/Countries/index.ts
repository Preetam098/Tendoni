import axios, { AxiosError, AxiosRequestConfig } from "axios";
import apiBaseUrl from "../index";
import { getToken } from "@/utils/hooks/Auth/authService";
import { CountriesInformation } from "../Countries/type";

export const postCountries = async (formData) => {
  try {
    const apiUrl = `${apiBaseUrl}/createCountry`;
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

export const getAllCountries = async () => {
  try {
    const apiUrl = `${apiBaseUrl}/getAllCountries`;
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

export const getCountryById = async (country: any) => {
  try {
    const apiUrl = `${apiBaseUrl}/getCountryById`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const data = {
      countryId: country,
    };

    const response = await axios.post(apiUrl, data, {
      headers: headers,
    });
    console.log("response", response);

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

export const putCountry = async (updatedData: CountriesInformation) => {
  try {
    const apiUrl = `${apiBaseUrl}/updateCountry`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const putData = {
      countryId: updatedData.id,
      countryName: updatedData.name,
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

export const deleteCountry = async (country: string) => {
  try {
    const apiUrl = `${apiBaseUrl}/deleteCountryById`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const requestData = {
      countryId: country,
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

export const putStatusChangeCountry = async (id: string) => {
  try {
    const apiUrl = `${apiBaseUrl}/statusChangeByCountryId`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const putData = {
      countryId: id,
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

export const getAllActiveCountry = async () => {
  try {
    const apiUrl = `${apiBaseUrl}/getAllActiveCountries`;
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
