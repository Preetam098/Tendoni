import { getToken } from "@/utils/hooks/Auth/authService";
import apiBaseUrl from "..";
import axios, { AxiosError } from "axios";
import { productVariantInformation, productVariantInformationUpdate } from './type';

export const getAllProductVariant = async () => {
    
    try {
        const apiUrl = `${apiBaseUrl}/getAllVariants`;
         const token = await getToken();
   
        const headers = {
            Authorization : token
        };
        const response = await axios.get(apiUrl,{headers});
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

export const postProductVariant = async (newData:productVariantInformation) => {
    try {
        const apiUrl = `${apiBaseUrl}/addVariant`;
        const token = await getToken();
    
        const headers = {
            Authorization: token,
            'Content-Type': 'application/json',
        };
    
        const postData = {
                variantName: newData?.variantName,
                status: newData?.status,
               
        };
    
        const response = await axios.post(apiUrl, postData, { headers });
        if(response.data.error === false){
        }else{
            // await getAllProductVariant()
            
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

export const putProductVariant = async (updatedData: productVariantInformationUpdate) => {
    try {
        const apiUrl = `${apiBaseUrl}/updateVariantById`;
        const token = await getToken();

        const headers = {
            Authorization: token,
            'Content-Type': 'application/json',
        };

        const putData = {
            variantName: updatedData?.variantName,
            variantId:updatedData?.id,
            status: updatedData?.status
            // Add any additional fields you need to update
        };

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
            console.error('Axios Error:', axiosError.code, axiosError.message);
            console.error('Axios Config:', axiosError.config);
        } else {
            console.error('Error during put request:', error);
        }
        throw error;
    }
};


export const deleteProductVariant = async (variantId: string) => {
    try {
        const apiUrl = `${apiBaseUrl}/deleteVariantById`;
        const token = await getToken();

        const headers = {
            Authorization: token,
            'Content-Type': 'application/json',
        };

        const requestData = {
            variantId: variantId,
        };

        const response = await axios.delete(apiUrl, { headers, data: requestData });
        if (response.data.error === false) {
            await getAllProductVariant();
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
export const putStatusChangeVariant = async (id: string,newStatus:string) => {
    // console.log(updatedData,'updatedData')
    try {
        const apiUrl = `${apiBaseUrl}/statusVariantById`;
        const token = await getToken();

        const headers = {
            Authorization: token,
            'Content-Type': 'application/json',
        };

        const putData = {
            
            variantId:id,
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

