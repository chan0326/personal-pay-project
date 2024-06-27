import { createSlice } from "@reduxjs/toolkit";
import { ISubcribe } from "../model/subcribe-model";
import { ChangeSubscribe } from "./subcribe-service";
const paymentThunks = []
const status = {
    pending:'pending',
    fullfilled : 'fullfilled',
    rejected: 'rejected'
}
const handleFulfilled =  (state: any, {payload}: any) => {
    state.array = payload
}
interface subcribeState{
    array? : Array<ISubcribe>,
    json? : ISubcribe,
    auth?: IAuth
}
interface IAuth{
    message?: string,
    token?: string
}
export const initialState:subcribeState = {
    json : {} as ISubcribe,
    array : [],
    auth: {} as IAuth

}

export const subcribeSlice = createSlice({
    name: "subcribe",
    initialState,
    reducers: {},
    extraReducers: builder => {
        const {pending, rejected} = status;

        // builder.addCase(findAllBoards.fulfilled, handleFulfilled)
        // builder.addCase(SavePayment.fulfilled, (state: any, {payload}: any)=>{state.auth= payload})
        builder.addCase(ChangeSubscribe.fulfilled, (state: any, {payload}: any)=>{state.auth= payload})
    }
})

export const  getauth  = (state: any) => state.subcribe.auth;

export const {} = subcribeSlice.actions
export default subcribeSlice.reducer;