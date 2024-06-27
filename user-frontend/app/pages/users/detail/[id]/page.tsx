'use client'
import { IPayment } from "@/app/component/payment/model/payment.model"
import { findPaymentsByUserId, refundPayment } from "@/app/component/payment/service/payment-service"
import { getPaymentsById } from "@/app/component/payment/service/payment-slice"
import { IUser } from "@/app/component/user/model/user"
import { findUserById, userDeleteById } from "@/app/component/user/service/user-service"
import { getUserById } from "@/app/component/user/service/user-slice"
import { Payments } from "@mui/icons-material"
import { Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function UserMyPage({ params }: any) {
    const dispatch = useDispatch();
    const user: IUser = useSelector(getUserById);
    const payments: IPayment[] = useSelector(getPaymentsById);
    const [showPayments, setShowPayments] = useState(false);
    const [allEvents, setAllEvents] = useState<IPayment[]>([]);

    payments.map((payment: IPayment) => {
        if (payment.createdAt) {
            payment.createdAt = new Date(payment.createdAt); // createdAt이 정의되어 있을 때에만 new Date() 호출
        }
        return payment;
    });
    


    

    const handleDelete = () => {
        alert("삭제완료");
        userDeleteById(user.id);
    };
    

    const handleShowPayments = () => {
        if (showPayments) {
            setShowPayments(false);
        } else {
            dispatch(findPaymentsByUserId(params.id))
                .then((data: any) => {
                    if (Array.isArray(data.payload)) {
                        setShowPayments(true);
                        console.log('data.payload:', data.payload);
                        setAllEvents(data.payload);
                    } else {
                        console.error('Error: fetched events are not an array:', data.payload);
                    }
                })
                .catch((error: any) => {
                    console.error('Error fetching events:', error);
                });
        }
    };

    const handleShowRefundPayments = (payment: IPayment) => {
        dispatch(refundPayment(payment))
            .then((res: any) => {
                alert('환불 완료');
            })
            .catch((err: any) => {
                console.log("환불 실패");
            });
    };

    useEffect(() => {
        dispatch(findUserById(params.id));
    }, [params.id, dispatch]);

    return (
        <>
            <h2>{params.id} 상세페이지</h2>
            <span>ID</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {user.id}</Typography>
            <span>username</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {user.username}</Typography>
            <span>password</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {user.password}</Typography>
            <span>name</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {user.name}</Typography>
            <span>phone</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {user.phone}</Typography>
            <span>job</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {user.job}</Typography>
            <span>point</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {user.point}</Typography>
            <span>subscribe</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {user.subscribe}</Typography>
            <div className="clearfix">
                <button onClick={handleDelete}>탈퇴</button>
                <button>수정</button>
            </div>
            <button
                onClick={handleShowPayments}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                {showPayments ? '결제내역 숨기기' : '결제내역보기'}
            </button>
            <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                목록보기
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12M5 1l4 4-4 4" />
                </svg>
            </a>
            {showPayments && (
                <div>
                    <h3>결제내역</h3>
                    <ul>
                    {allEvents.map((payment: IPayment) => (
    <li key={payment.id}>
        <Typography>
        {payment.createdAt ? new Date(payment.createdAt).toLocaleString() : ''} -  {payment.amount}원 - {`상품${payment.productId}`} 
            <button
                onClick={() => handleShowRefundPayments(payment)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                환불
            </button>
        </Typography>
    </li>
))}

                    </ul>
                </div>
            )}
        </>
    );
}








