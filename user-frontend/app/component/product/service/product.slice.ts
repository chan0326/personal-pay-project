import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../model/product.model";
import { paymentproduct } from "./product.service";
const paymentThunks = []
const status = {
    pending:'pending',
    fullfilled : 'fullfilled',
    rejected: 'rejected'
}
const handleFulfilled =  (state: any, {payload}: any) => {
    state.array = payload
}
interface productState{
    array? : Array<IProduct>,
    json? : IProduct,
    auth?: IAuth
}
interface IAuth{
    message?: string,
    token?: string
}
export const initialState:productState = {
    json : {} as IProduct,
    array : [],
    auth: {} as IAuth

}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: builder => {
        const {pending, rejected} = status;

        // builder.addCase(findAllBoards.fulfilled, handleFulfilled)
        // builder.addCase(SavePayment.fulfilled, (state: any, {payload}: any)=>{state.auth= payload})
        builder.addCase(paymentproduct.fulfilled, (state: any, {payload}: any)=>{state.auth= payload})
    }
})

export const  getauth  = (state: any) => state.payment.auth;

export const {} = productSlice.actions
export default productSlice.reducer;