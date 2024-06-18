import { instance } from "@/app/component/common/configs/axios-config"

export const findAllBoardsAPI = async () => {
    try {
        const response = await instance().get('/boards/list')
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const findBoardByIdAPI = async (id:number) => {
    try {
        const response = await instance().get(`/boards/detail` ,{params: {id}})
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}