import { getToken } from "@/utils/hooks/Auth/authService";
import apiBaseUrl from "..";
import axios, { AxiosError } from "axios";


export const postPayment = async (newData:any) => {
    try {
        const apiUrl = `${apiBaseUrl}/addNewPayment`;
        const token = await getToken();
        const headers = {
            Authorization: token,
            "Content-Type": "application/json",
        };
        const response = await axios.post(apiUrl, newData, { headers });
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




export const approvePayment = async (newData:any) => {
    try {
        const apiUrl = `${apiBaseUrl}/approveWebsitePaymentByAccountant`;
        const token = await getToken();
        const headers = {
            Authorization: token,
            "Content-Type": "application/json",
        };
        const response = await axios.post(apiUrl, newData, { headers });
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