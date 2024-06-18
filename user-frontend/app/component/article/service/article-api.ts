import { instance } from "@/app/component/common/configs/axios-config"
import { IArticle } from "../model/article"

export const findAllArticlesAPI = async (id:number) => {
    try {
        const response = await instance().get('/articles/list', {params: {id}})
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const findArticleByIdAPI = async (id:number) => {
    try {
        const response = await instance().get(`/articles/detail`, {params: {id}})
        return response.data
    } catch (error) {

        console.log(error)
        return error
    }
}

export const articleDeleteByIdAPI = async (id:number) => {
    try {
        const response = await instance().delete(`/articles/delete` , {params:{id}})
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const articleSaveAPI = async (article:IArticle) => {
    try {
        const response = await instance().post(`/articles/save`, article)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const modifyArticleAPI = async (article:IArticle) => {
    try {
        const response = await instance().put(`/articles/modify`, article)
        console.log("response modifyArticleAPI : "+ response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}