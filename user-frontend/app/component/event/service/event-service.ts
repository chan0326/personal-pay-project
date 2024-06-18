import { createAsyncThunk } from "@reduxjs/toolkit";
import { IEvent } from "../model/event";
import { findEventByIdAPI, saveEventAPI } from "./event-api";





export const SaveEvent: any = createAsyncThunk('/event/SaveEvent',
    async (event: IEvent) => await saveEventAPI(event))
    
    
    export const findEventById: any = createAsyncThunk(
        'event/findEventById',
        async (id: number) => {
            const data: any = await findEventByIdAPI(id);
            return data
        }
    )