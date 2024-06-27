export interface IEvent{
    title?: string, 
    allDay?: boolean, 
    start?: Date | string,
    end?: Date | string,
    id?: number,
    userId?: number,
    endTime?: Date,
    startTime?: Date | string,
    array?: IEvent[],
    json?:IEvent
}