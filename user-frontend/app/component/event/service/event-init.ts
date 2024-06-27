import {  IEvent } from "../model/event";

export const initialState:IEvent = {
    id: 0,
    title: '',
    start: '',
    end: '',
    allDay: false,
    userId: 0,
    endTime: new Date(),
    startTime: new Date(),
    array: [],
    json:{}
}