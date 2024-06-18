
import {  instance } from "../../common/configs/axios-config";
import axios from "axios";
import { IProduct } from "../model/product.model";


export const paymentproductAPI = async (product:IProduct) => {
    try{
        const response = await instance().post('/product/payment',product)
        // java 에서 Messenger.message에 값을 담음
        console.log(response.data)
        return response.data
    } 
    catch(error){
        console.log(error)
        return error
    }
}