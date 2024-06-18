export interface IEvent{
    title?: string, 
    start?: Date | string, 
    allDay?: boolean, 
    id?: number,
    userId?: number,
    array?: IEvent[],
    json?:IEvent
}