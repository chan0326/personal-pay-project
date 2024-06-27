import Link from "next/link";
import { PG } from "../../common/enums/PG";
import Typography from "@mui/material/Typography";
import { GridColDef } from "@mui/x-data-grid";
import { ISubcribe } from "../model/subcribe-model";

interface CellType{
    row : ISubcribe
}

export default function Columns() : GridColDef[]{

    return [
        {
            flex:0.04,
            field: 'id',
            minWidth: 30,
            sortable:false,
            headerName: 'ID',
            renderCell:({row}:CellType) => <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>{row.id}</Typography>
        }

       
    ]
}