import axios, { AxiosError, AxiosRequestConfig } from "axios";
import apiBaseUrl from "../index";
import { getToken } from "@/utils/hooks/Auth/authService";
import { SubCategory } from "./type";

export const getAllSubCategoriesByCategoryId = async (categoryId: string) => {
  try {
    // getAllSubCategories
    const apiUrl = `${apiBaseUrl}/getCategoryById`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const data = {
      categoryId: categoryId,
    };

    const response = await axios.post(apiUrl, data, {
      headers: headers,
    });

    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const postSubCategory = async (newData: any) => {
  try {
    const apiUrl = `${apiBaseUrl}/createSubCategory`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    };

    // const postData = {
    //   categoryId: newData.categoryId,
    //   subCategoryImage: newData.subCategoryImage,
    //   status: newData.status,
    //   subCategoryName: newData.subCategoryName,
    // };

    const response = await axios.post(apiUrl, newData, { headers });
    if (response.data.error === false) {
      // await getAllSubCategoriesByCategoryId(newData.categoryId);
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

export const putSubCategory = async (updatedData: any) => {
  try {
    const apiUrl = `${apiBaseUrl}/updateSubCategory`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    };

    // const putData = {
    //   categoryId: updatedData.categoryId,
    //   subCategoryId: updatedData.id,
    //   subCategoryImage: updatedData.subCategoryImage,
    //   status: updatedData.status,
    //   subCategoryName: updatedData.subCategoryName,
    // };

    const response = await axios.put(apiUrl, updatedData, { headers });
    if (response.data.error === false) {
      // await getAllSubCategoriesByCategoryId(updatedData.categoryId);
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

export const deleteSubCategory = async (subCategory: string, id: string) => {
  try {
    const apiUrl = `${apiBaseUrl}/deleteSubCategory`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const requestData = {
      subCategoryId: subCategory,
    };

    const response = await axios.delete(apiUrl, { headers, data: requestData });
    if (response.data.error === false) {
      // await getAllSubCategoriesByCategoryId(id);
    } else {
      // Handle the error case if needed
      // alert("Failed to delete product variant");
    }

    return response.data;
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
export const putSubStatusChangeCategory = async (
  id: string,
  newStatus: string
) => {
  try {
    const apiUrl = `${apiBaseUrl}/statusChangeSubCategory`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const putData = {
      subCategoryId: id,
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
