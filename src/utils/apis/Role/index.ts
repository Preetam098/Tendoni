import axios, { AxiosError, AxiosRequestConfig } from "axios";
import apiBaseUrl from "../index";
import { getToken } from "@/utils/hooks/Auth/authService";
import { RoleInformation, roleUpdateInformation } from "../Role/type";

export const postRole = async (newData: RoleInformation) => {
  try {
    const apiUrl = `${apiBaseUrl}/createRole`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const postData = {
      
      roleName: newData?.name,
      permissions: newData.permission,
    };

    console.log(postData)

    const response = await axios.post(apiUrl, postData, { headers });
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
// -----------updatePost URl-----------


export const updatePostRole = async (updateData: roleUpdateInformation) => {
  try {
    const apiUrl = `${apiBaseUrl}/updateRole`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const postData = {
      roleName: updateData?.name,
      permissions: updateData?.permission,
      roleId: updateData?.roleId
    };

    console.log(postData);

    const response = await axios.put(apiUrl, postData, { headers });
    if (response.data.error === false) {
      console.log("Role updated successfully");
    } else {
      console.error("Error updating role:", response.data.message);
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




export const getAllRole = async () => {
  try {
    const apiUrl = `${apiBaseUrl}/getAllRoles`;
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

export const getRoleById = async (role: any) => {
  try {
    const apiUrl = `${apiBaseUrl}/getRoleById`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const data = {
      roleId: role,
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

export const putRole = async (updatedData: RoleInformation) => {
  try {
    const apiUrl = `${apiBaseUrl}`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const putData = {
      roleId: updatedData.id,
      roleName: updatedData.name,
      permissions: [],
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

export const deleteRole = async (Role: string) => {
  try {
    const apiUrl = `${apiBaseUrl}/deleteRoleById`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const requestData = {
      roleId: Role,
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

export const putStatusChangeRole = async (id: string) => {
  try {
    const apiUrl = `${apiBaseUrl}/statusUpdateByRoleId`;
    const token = await getToken();

    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const putData = {
      roleId: id,
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

export const getAllActiveRole = async () => {
  try {
    const apiUrl = `${apiBaseUrl}/getAllActiveRoles`;
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
