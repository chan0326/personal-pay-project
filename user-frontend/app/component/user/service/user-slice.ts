import { createSlice } from "@reduxjs/toolkit";
import { existsId, findAllUsers, findUserById, login, save } from "./user-service";
import { IUser } from "../model/user";

const userThunks = [findAllUsers, findUserById]

const status = {
    pending: 'pending',
    fulfilled: 'fulfilled',
    rejected: 'rejected'
}

interface IAuth {
    message?: string
    token?: string
}

interface UserState {
    array?: Array<IUser>
    json?: IUser
    auth?: IAuth
}

export const initialState: UserState = {
    array: [],
    json: {} as IUser,
    auth: {} as IAuth
}

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: builder => {
        const { pending, rejected } = status;
        builder
            .addCase(findAllUsers.fulfilled, (state: any, { payload }: any) => { state.array = payload })
            .addCase(findUserById.fulfilled, (state: any, { payload }: any) => { state.json = payload })
            .addCase(login.fulfilled, (state: any, { payload }: any) => { state.auth = payload })
            .addCase(existsId.fulfilled, (state: any, { payload }: any) => { state.auth = payload })
            .addCase(save.fulfilled, (state: any, { payload }: any) => { state.auth = payload })
    }

})
export const getAllUsers = (state: any) => state.user.array
export const getUserById = (state: any) => state.user.json
export const getAuth = (state: any) => state.user.auth
export const getExistsId = (state: any) => state.user.auth
export const getSave = (state: any) => state.user.auth


export const { } = userSlice.actions

export default userSlice.reducer