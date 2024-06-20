import { createSlice } from "@reduxjs/toolkit"
import { IEvent } from "../model/event"
import { AddEvent, SaveEvent, findEventById } from "./event-service"
import { initialState } from "./event-init"

const status = {
    pending:'pending',
    fullfilled : 'fullfilled',
    rejected: 'rejected'
}
const handleFulfilled =  (state: any, {payload}: any) => {
    state.array = payload
}




export const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {},
    extraReducers: builder => {
        const {pending, rejected} = status;

        // builder.addCase(findAllBoards.fulfilled, handleFulfilled)
        builder
               .addCase(SaveEvent.fulfilled, (state: any, {payload}: any)=>{state.message= payload})
               .addCase(findEventById.fulfilled, (state: any, { payload }: any) => { state.json = payload })
               .addCase(AddEvent.fulfilled, (state: any, { payload }: any) => { state.message = payload })
        
    }
})

export const  getauth  = (state: any) => state.event.auth;
export const getEventById = (state: any) => state.event.json;

export const {} = eventSlice.actions
export default eventSlice.reducer;