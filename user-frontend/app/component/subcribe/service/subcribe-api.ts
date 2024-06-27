
import {  instance } from "../../common/configs/axios-config";
import axios from "axios";
import { ISubcribe } from "../model/subcribe-model";


export const ChangeSubscribeAPI = async (subscribe:ISubcribe) => {
    try{
        const response = await instance().post('/subscribe/save',subscribe)
        // java 에서 Messenger.message에 값을 담음
        console.log(response.data)
        return response.data
    } 
    catch(error){
        console.log(error)
        return error
    }
}