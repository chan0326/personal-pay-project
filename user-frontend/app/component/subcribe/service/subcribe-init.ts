import { ISubcribe } from "../model/subcribe-model";

export const initialState:ISubcribe = {
    id : 0,
    subcribeState : false,
    endDate : new Date(),
    createAt :    new Date(),
    updateAt : new Date(),
}