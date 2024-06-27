import { IPayment } from "../model/payment.model";

export const initialState:IPayment = {
    id : 0,
    productId : 0,
    merchant_uid : '',
    amount : 0,
    paymentUid : '',
    paymentState: '',
    createdAt : new Date()
}