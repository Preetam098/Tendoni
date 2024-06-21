
import axios, { AxiosError, AxiosRequestConfig }  from 'axios';
import apiBaseUrl from '../index';
import { getToken } from '@/utils/hooks/Auth/authService';


export const getAllCategories = async () => {
    try {
        const apiUrl = `${apiBaseUrl}/getAllCategories`;
        const token = await getToken();

        const headers = {
            Authorization: token,
            'Content-Type': 'application/json',
        };

        
        const response = await axios.get(apiUrl, {
            headers: headers,
        });

        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.error('Axios Error:', axiosError.code, axiosError.message);
            console.error('Axios Config:', axiosError.config);
        } else {
            console.error('Error during login:', error);
        }
        throw error;
    }
};


export const postCategories = async (newData:any) => {

    try {
        const apiUrl = `${apiBaseUrl}/createCategory`;
        const token = await getToken();
    
        const headers = {
            Authorization: token,
            "Content-Type": "multipart/form-data",
        };
    
        // const postData = {
        //         categoryImage: newData?.categoryImage,
        //         status: newData?.status,
        //        categoryName:newData?.categoryName
        // };
    
        const response = await axios.post(apiUrl, newData, { headers });
        if(response.data.error === false){
            // await getAllCategories()
        }else{
            
            // alert("Successfully added salesman");
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.error('Axios Error:', axiosError.code, axiosError.message);
            console.error('Axios Config:', axiosError.config);
        } else {
            console.error('Error during post request:', error);
        }
        throw error;
    }
    
    
};

export const putCategories = async (updatedData: any) => {
    try {
        const apiUrl = `${apiBaseUrl}/updateCategory`;
        const token = await getToken();

        const headers = {
            Authorization: token,
            "Content-Type": "multipart/form-data",
        };

        // const putData = {
        //     categoryName: updatedData?.categoryName,
        //     categoryId:updatedData?.id,
        //     status: updatedData?.status,
        //     categoryImage: updatedData?.categoryImage,
        //     // Add any additional fields you need to update
        // };
//         {
//     "valueId": "fd583aae-c077-4c4b-a382-317c8464d711",
//     "valueName":"Red",
//     "status":"active"

// }

        const response = await axios.put(apiUrl, updatedData, { headers });
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
            console.error('Axios Error:', axiosError.code, axiosError.message);
            console.error('Axios Config:', axiosError.config);
        } else {
            console.error('Error during put request:', error);
        }
        throw error;
    }
};
export const putStatusChangeCategory = async (id: string,newStatus:string) => {
    // console.log(updatedData,'updatedData')
    try {
        const apiUrl = `${apiBaseUrl}/statusChangeCategory`;
        const token = await getToken();

        const headers = {
            Authorization: token,
            'Content-Type': 'application/json',
        };

        const putData = {
            
            categoryId:id,
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
            console.error('Axios Error:', axiosError.code, axiosError.message);
            console.error('Axios Config:', axiosError.config);
        } else {
            console.error('Error during put request:', error);
        }
        throw error;
    }
};

export const deleteCategories = async (id:any) => {
    try {
        const apiUrl = `${apiBaseUrl}/deleteCategory`;
        const token = await getToken();

        const headers = {
            Authorization: token,
            'Content-Type': 'application/json',
        };

        const requestData = {
            categoryId: id,
        };

        const response = await axios.delete(apiUrl, { headers, data: requestData });
        if (response.data.error === false) {
            // await getAllCategories();
        } else {
            // Handle the error case if needed
            // alert("Failed to delete product variant");
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.error('Axios Error:', axiosError.code, axiosError.message);
            console.error('Axios Config:', axiosError.config);
        } else {
            console.error('Error during delete request:', error);
        }
        throw error;
    }
};




