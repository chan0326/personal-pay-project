import { IPayment } from "../model/payment.model";
import Link from "next/link";
import { PG } from "../../common/enums/PG";
import Typography from "@mui/material/Typography";
import { GridColDef } from "@mui/x-data-grid";
interface CellType{
    row : IPayment
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
            field: 'merchant_uid',
            minWidth: 30,
            sortable:false,
            headerName: 'merchant_uid',
            renderCell:({row}:CellType) => <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>
                <Link href={`${PG.PAYMENT}/detail/${row.id}`}>{row.merchant_uid}</Link></Typography>
        },
        {
            flex:0.04,
            field: 'name',
            minWidth: 30,
            sortable:false,
            headerName: 'name',
            renderCell:({row}:CellType) => <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>{row.name}</Typography>
        },
        {
            flex:0.04,
            field: 'amount',
            minWidth: 30,
            sortable:false,
            headerName: 'amount',
            renderCell:({row}:CellType) => <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>{row.amount}</Typography>
        },
        {
            flex:0.04,
            field: 'paymentDate',
            minWidth: 30,
            sortable:false,
            headerName: 'paymentDate',
            renderCell:({row}:CellType) => <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>{row.paymentDate}</Typography>
        },
        {
            flex:0.04,
            field: 'paymentUid',
            minWidth: 30,
            sortable:false,
            headerName: 'paymentUid',
            renderCell:({row}:CellType) => <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>{row.paymentUid}</Typography>
        },
       
    ]
}