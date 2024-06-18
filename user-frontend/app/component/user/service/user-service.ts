import { createAsyncThunk } from "@reduxjs/toolkit";
import { existsIdAPI, findAllUsersAPI, findUserByIdAPI, loginAPI, logoutAPI, saveAPI, userDeleteByIdAPI } from "./user-api";
import { IUser } from "../model/user";


export const findAllUsers: any = createAsyncThunk(
    'users/findAllUsers',
    async (page: number) => {
        console.log('findAllUsers page : ' + page)
        const data: any = await findAllUsersAPI(page);
        const { message, result }: any = data
        return data
    }
)

export const findUserById: any = createAsyncThunk(
    'users/findUserById',
    async (id: number, { rejectWithValue }) => {
        console.log('findUserById id : ' + id)
        const data: any = await findUserByIdAPI(id);
        const { message, result }: any = data
        return data
    }
)

export const userDeleteById: any = createAsyncThunk(
    'users/userDeleteById',
    async (id: number, { rejectWithValue }) => {
        console.log('findUserById id : ' + id)
        const data: any = await userDeleteByIdAPI(id);
        const { message, result }: any = data
        return data
    }
)

export const login: any = createAsyncThunk(
    'users/login',
    async (user: IUser) => await loginAPI(user),

)

export const existsId: any = createAsyncThunk('users/existsById',
    async (username: IUser) => await existsIdAPI(username)
)

export const logout: any = createAsyncThunk('users/logout',
    async () => await logoutAPI()
)

export const save: any = createAsyncThunk(
    'auth/save',
    async (user: IUser) => await saveAPI(user),

)