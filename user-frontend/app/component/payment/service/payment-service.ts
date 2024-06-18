import {createAsyncThunk} from "@reduxjs/toolkit"
import { IPayment } from "../model/payment.model";
import { SavePaymentAPI, findPaymentsByUserIdAPI, refundPaymentAPI } from "./payment-api";


export const SavePayment: any =createAsyncThunk('/payment/SavePayment',
async(payment:IPayment, {rejectWithValue})=>  await SavePaymentAPI(payment)
)

export const findPaymentsByUserId: any =createAsyncThunk('/payment/findPaymentsByUserId',
    async (id: number, { rejectWithValue }) => {
        console.log('findPaymentsByUserId id:' + id)
        const data: any = await findPaymentsByUserIdAPI(id);
        return data
    }
)

export const refundPayment: any =createAsyncThunk('/payment/refundPayment',
    async (payment:IPayment, {rejectWithValue})=>  await refundPaymentAPI(payment)
)