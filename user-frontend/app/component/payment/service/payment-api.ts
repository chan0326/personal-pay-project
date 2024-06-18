
import {  instance } from "../../common/configs/axios-config";
import axios from "axios";
import { IPayment } from "../model/payment.model";
const SERVER = 'http://localhost:8080';
export const SavePaymentAPI = async (payment:IPayment) => {
    try{
        const response = await instance().post('/payment/save',payment)
        // java 에서 Messenger.message에 값을 담음
        console.log(response.data)
        return response.data
    } 
    catch(error){
        console.log(error)
        return error
    }
}
export const findPaymentsByUserIdAPI = async (id:number) => {
  try {
    const response = await instance().get(`/payment/find`, {params: {id}})
    return response.data
} catch (error) {

    console.log(error)
    return error
}
}
export const postPayment = (data: { payment_uid: string; order_uid: string }) => {
    return axios.post(`${SERVER}/payment`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  
  export const refundPaymentAPI = async (payment:IPayment) => {
    try{
        const response = await instance().post('/payment/refund',payment)
        console.log(response.data)
        return response.data
    } 
    catch(error){
        console.log(error)
        return error
    }
}