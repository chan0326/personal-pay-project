
import { instance } from "../../common/configs/axios-config"
import { IUser } from "../model/user"

export const findAllUsersAPI = async (page: number) =>{
    try{
        const response = await instance().get('/users/list',{
            params: {page, limit: 10}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}

export const findUserByIdAPI = async (id:number) =>{
    try{
        const response = await instance().get(`/users/detail` ,{params: {id}})
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}

export const userDeleteByIdAPI = async (id:number) =>{
    try{
        const response = await instance().delete(`/users/delete` , {params: {id}})
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}

export const loginAPI = async (user:IUser) =>{
    try{
        const response = await instance().post(`/auth/login` , user)
        //java에서 Messenger.message에 값을 담음
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}

export const existsIdAPI = async (username:IUser) =>{
    try{
        const response = await instance().get(`/auth/exists-username` , {params: {username}})
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}

export const logoutAPI = async () => {
    try{
        const response = await instance().get(`/users/logout`)
        console.log('logoutAPI 결과: '+ response.data)
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}

export const saveAPI = async (user:IUser) =>{
    try{
        const response = await instance().post(`/auth/save` , user)
        //java에서 Messenger.message에 값을 담음
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}