export interface IPayment{
    id ? : number,
    merchant_uid? : string,
    name? : string,
    amount? : number,
    paymentUid? : string,
    order_uid: string,
    imp_uid?: string,
    paymentDate?: string,
}