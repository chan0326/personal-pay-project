export interface IPayment{
    id ? : number,
    productId? : number,
    merchant_uid? : string,
    amount? : number,
    paymentUid? : string,
    imp_uid?: string,
    paymentState?: string,
    createdAt? : Date
}