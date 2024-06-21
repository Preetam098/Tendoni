import axios, { AxiosError, AxiosRequestConfig } from "axios";
import apiBaseUrl from "../index";
import { getToken } from "@/utils/hooks/Auth/authService";

export const getAllActiveCategories = async () => {
  try {
    const apiUrl = `${apiBaseUrl}/getAllActiveCategories`;
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

export const getAllActiveVariants = async () => {
  try {
    const apiUrl = `${apiBaseUrl}/getAllActiveVariants`;
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

export const postProduct = async (newData: any) => {
  try {
    const apiUrl = `${apiBaseUrl}/addProduct`;
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

export const getAllProducts = async () => {
  try {
    const apiUrl = `${apiBaseUrl}/getProducts`;
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
export const getProductById = async (product: any) => {
  try {
    const apiUrl = `${apiBaseUrl}/getProductByProductId`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const data = {
      productId: product,
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

export const putProductUpdate = async (updatedData: any, productId: string) => {
  const updatedDataWithAdditionalKey = {
    ...updatedData,
    subProductId: updatedData.subCategoryId,
    productId: productId,
  };
  try {
    const apiUrl = `${apiBaseUrl}/updateProductByProductId`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    };

    const putData = updatedDataWithAdditionalKey;

    const response = await axios.put(apiUrl, putData, { headers });
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

export const deleteProduct = async (ProductId: string) => {
  try {
    const apiUrl = `${apiBaseUrl}/deleteProductByProductId`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const requestData = {
      productId: ProductId,
    };

    const response = await axios.delete(apiUrl, { headers, data: requestData });
    if (response.data.error === false) {
      // await getAllProductVariant();
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

export const putStatusChangeProduct = async (id: string, newStatus: string) => {
  try {
    const apiUrl = `${apiBaseUrl}/statusProductByProductId`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const putData = {
      productId: id,
      productStatus: newStatus,

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
