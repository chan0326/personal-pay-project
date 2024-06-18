import Link from "next/link";
import { PG } from "../../common/enums/PG";
import Typography from "@mui/material/Typography";
import { GridColDef } from "@mui/x-data-grid";
import { IProduct } from "../model/product.model";
interface CellType{
    row : IProduct
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
        },
        {
            flex:0.04,
            field: 'name',
            minWidth: 30,
            sortable:false,
            headerName: 'name',
            renderCell:({row}:CellType) => <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}></Typography>
        },
        
        {
            flex:0.04,
            field: 'price',
            minWidth: 30,
            sortable:false,
            headerName: 'price',
            renderCell:({row}:CellType) => <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>{row.price}</Typography>
        },
        {
            flex:0.04,
            field: 'description',
            minWidth: 30,
            sortable:false,
            headerName: 'description',
            renderCell:({row}:CellType) => <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>{row.description}</Typography>
        },
        {
            flex:0.04,
            field: 'modDate',
            minWidth: 30,
            sortable:false,
            headerName: 'modDate',
            renderCell:({row}:CellType) => <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>{row.modDate}</Typography>
        },
        {
            flex:0.04,
            field: 'regDate',
            minWidth: 30,
            sortable:false,
            headerName: 'regDate',
            renderCell:({row}:CellType) => <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>{row.regDate}</Typography>
        },
       
    ]
}