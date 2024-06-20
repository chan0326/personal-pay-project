import { instance } from "../../common/configs/axios-config"
import { IEvent } from "../model/event"




export const saveEventAPI = async (event:IEvent) => {
    try {
        const response = await instance().post(`/calendars/save`, event)
        console.log("response saveEventAPI : "+ response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}
export const findEventByIdAPI = async (id:number) => {
    try {
        const response = await instance().get(`/calendars/list`, {params: {id}})
        console.log("response findEventByIdAPI : "+ response.data)
        return response.data
    } catch (error) {

        console.log(error)
        return error
    }
}

export const AddEventAPI = async (event:IEvent) => {
    try{
        const response = await instance().post('/calendars/add',event)
        // java 에서 Messenger.message에 값을 담음
        console.log(response.data)
        return response.data
    } 
    catch(error){
        console.log(error)
        return error
    }
}