import {createAsyncThunk} from "@reduxjs/toolkit"
import { ISubcribe } from "../model/subcribe-model";
import { ChangeSubscribeAPI } from "./subcribe-api";



export const ChangeSubscribe: any =createAsyncThunk('/subscribe/ChangeSubcribe',
async(subcribe:ISubcribe, {rejectWithValue})=>  await ChangeSubscribeAPI(subcribe)
)