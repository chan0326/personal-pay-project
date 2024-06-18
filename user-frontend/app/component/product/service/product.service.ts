import {createAsyncThunk} from "@reduxjs/toolkit"
import { IProduct } from "../model/product.model";
import { paymentproductAPI } from "./product.api";



export const paymentproduct: any =createAsyncThunk('/payment/paymentproduct',
async(payment:IProduct, {rejectWithValue})=>  await paymentproductAPI(payment)
)