import {  IEvent } from "../model/event"
import { Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { MyTypography } from "../../common/style/cell";
interface CellType{
    row : IEvent
}


export default function CalendarColumns(): GridColDef[]{

    return [
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'id',
            headerName: 'No.',
            renderCell: ({row}:CellType) => MyTypography(row.id, "1.2rem")
        }
        ,
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'title',
            headerName: 'title',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.2rem"}}></Typography>,
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'start',
            headerName: '등록일',
            renderCell: ({row}:CellType) =>  MyTypography(row.start, "1.2rem")
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'allDay',
            headerName: 'allDay',
            renderCell: ({row}:CellType) =>  MyTypography(row.allDay, "1.2rem")
        }
    ]

}