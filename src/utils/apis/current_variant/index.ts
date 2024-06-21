import axios, { AxiosError, AxiosRequestConfig }  from 'axios';
import apiBaseUrl from '../index';
import { getToken } from '@/utils/hooks/Auth/authService';
import { currentVariantInformation, putCurrentVariantInformation } from './type';

export const getVariant = async (variantId: any) => {
    try {
        const apiUrl = `${apiBaseUrl}/getVariantValueByVariantId`;
        const token = await getToken();

        const headers = {
            Authorization: token,
            'Content-Type': 'application/json',
        };

        const data = {
            variantId: variantId,
        };

        const response = await axios.post(apiUrl, data, {
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

export const postCurrentVariant = async (newData:currentVariantInformation,id:any) => {

    try {
        const apiUrl = `${apiBaseUrl}/addVariantValue`;
        const token = await getToken();
    
        const headers = {
            Authorization: token,
            'Content-Type': 'application/json',
        };
    
        const postData = {
                valueName: newData?.variantName,
                status: newData?.status,
               variantId:id
        };
    
        const response = await axios.post(apiUrl, postData, { headers });
        if(response.data.error === false){
            // await getVariant(id)
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


export const putCurrentVariant = async (updatedData: putCurrentVariantInformation,id:any) => {
    try {
        const apiUrl = `${apiBaseUrl}/updateVariantValueById`;
        const token = await getToken();

        const headers = {
            Authorization: token,
            'Content-Type': 'application/json',
        };

        const putData = {
            valueName: updatedData?.variantName,
            valueId:updatedData.id,
            status: updatedData?.status,
            // Add any additional fields you need to update
        };
//         {
//     "valueId": "fd583aae-c077-4c4b-a382-317c8464d711",
//     "valueName":"Red",
//     "status":"active"

// }

        const response = await axios.put(apiUrl, putData, { headers });
        if (response.data.error === false) {
            // await getVariant(id);
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

export const deleteCurrentVariant = async (variantId: string,id:any) => {
    try {
        const apiUrl = `${apiBaseUrl}/deleteVariantValueById`;
        const token = await getToken();

        const headers = {
            Authorization: token,
            'Content-Type': 'application/json',
        };

        const requestData = {
            valueId: variantId,
        };

        const response = await axios.delete(apiUrl, { headers, data: requestData });
        if (response.data.error === false) {
            // await getVariant(id);
        } else {
            // Handle the error case if needed
            // alert("Failed to delete product variant");
        }

        return response.data.data;
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

export const putStatusChangeCurrentVariant = async (id: string,newStatus:string) => {
    try {
        const apiUrl = `${apiBaseUrl}/statusVariantValueById`;
        const token = await getToken();

        const headers = {
            Authorization: token,
            'Content-Type': 'application/json',
        };

        const putData = {
            
            valueId:id,
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