import { Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { MyTypography } from "../../common/style/cell";
import { PG } from "../../common/enums/PG";
import Link from "next/link";
import { IBoard } from "../model/board";


interface CellType{
    row : IBoard
}


export default function BoardColumns(): GridColDef[]{

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
            field: 'description',
            headerName: 'description',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.2rem"}}></Typography>,
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'regDate',
            headerName: '등록일',
            renderCell: ({row}:CellType) =>  MyTypography(row.regDate, "1.2rem")
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'modDate',
            headerName: '수정일',
            renderCell: ({row}:CellType) =>  MyTypography(row.modDate, "1.2rem")
        }
    ]

}