'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SavePayment } from '@/app/component/payment/service/payment-service';
import { parseCookies } from 'nookies';
import { findUserById } from '@/app/component/user/service/user-service';
import { IUser } from '@/app/component/user/model/user';
import { getUserById } from '@/app/component/user/service/user-slice';
import { paymentproduct } from '@/app/component/product/service/product.service';

export default function Payment({ params }: any) {
  const dispatch = useDispatch();
  const user: IUser = useSelector(getUserById);
  const [amount, setAmount] = useState(100); // default amount is 100
  const [selectedOption, setSelectedOption] = useState<'option1' | 'option2' | 'option3'>('option1');


  useEffect(() => {
    console.log('params.id:', params.id);
    dispatch(findUserById(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    const jquery = document.createElement('script');
    jquery.src = 'http://code.jquery.com/jquery-1.12.4.min.js';
    const iamport = document.createElement('script');
    iamport.src = 'http://cdn.iamport.kr/js/iamport.payment-1.1.7.js';
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const requestPay = async () => {
    window.IMP.init(process.env.NEXT_PUBLIC_IAMPORT_API_KEY); // Iamport 가맹점 식별코드

    window.IMP.request_pay(
      {
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: new Date().getTime().toString(), //  주문 번호
        name: '테스트 상품',
        amount: amount, // Use the state variable for amount
        buyer_email: 'test@naver.com',
        buyer_name: user.name,
        buyer_tel: user.phone,
        buyer_addr: user.addressId,
        buyer_postcode: '123-456',
      },
      async (rsp: any) => {
        try {
          if (rsp.success) {
            console.log(rsp.imp_uid);

            const token = parseCookies().accessToken; 

            const { data } = await axios.post(
              `http://localhost:8080/api/payment/verifyIamport/${rsp.imp_uid}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            );
            console.log(rsp.imp_uid);
            if (rsp.paid_amount === data.response.amount) {  
              console.log(data.response);
              const paymentData = {
                userId: params.id,
                amount: data.response.amount,
                status: 'OK', 
                paymentUid: rsp.imp_uid,
                paymentDate: new Date().toISOString()
              };
              dispatch(SavePayment(paymentData));
              console.log('data.response.amount:', data.response.amount);
              alert('결제 성공');
            } else {
              alert('결제 실패');
            }
          } else {
            alert('결제 실패');
          }
        } catch (error) {
          console.error('Error while verifying payment:', error);
          alert('결제 실패');
        }
      }
    );
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value as 'option1' | 'option2');
  }

  const requestProductPay = async () => {
    const products = {
      option1: { id: 1, name: '상품 1', price: 100 ,subscribe: 10},
      option2: { id: 2, name: '상품 2', price: 200 ,subscribe: 30},
      option3: { id: 3, name: '상품 3', price: 500 ,subscribe: 60}
    };

    const selectedProduct = products[selectedOption];

    if (!selectedProduct) {
      alert('유효한 상품을 선택하세요.');
      return;
    } else {
      const productData = {
        userId: params.id,
        id: selectedProduct.id,
        price: selectedProduct.price,
        name: selectedProduct.name,
        subscribeDate: selectedProduct.subscribe
      };
      dispatch(paymentproduct(productData))
        .then((res: any) => {
          console.log('함수 전송 완료');
          console.log(res.payload);
          if (res.payload.message === "상품결제 성공") {
            alert('상품결제 성공');
          } else {
            alert('상품결제 실패');
            alert(res.payload.message);
          }
        })
        .catch((err: any) => {
          console.log("상품결제 실패", err);
        });
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <label htmlFor="point" className="block text-lg font-bold mb-2">결제할 포인트를 입력하세요</label>
      <input 
  type="number" 
  value={amount} 
  onChange={(e) => setAmount(parseInt(e.target.value, 10))} 
  placeholder="Enter amount" 
  style={{ border: '1px solid black' }}
/>

      <br />
      <button 
        onClick={requestPay} 
        style={{ 
          padding: '10px 20px', 
          backgroundColor: 'black', 
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '5px', // 둥근 모서리 추가
          marginBottom: '20px' // 아래 여백 추가
        }}
      >
        결제하기
      </button>
  
      <div style={{ display: 'flex', justifyContent: 'center' }}>
  <div style={{ marginRight: '20px', border: '1px solid #ccc', borderRadius: '12px', padding: '20px', textAlign: 'center', minWidth: '250px' }}>
    <input 
      type="radio" 
      id="option1"
      name="product" 
      value="option1" 
      checked={selectedOption === 'option1'} 
      onChange={handleRadioChange} 
    />
    <label htmlFor="option1" style={{ marginLeft: '5px', fontSize: '18px' }}>1. 상품</label>
    <div style={{ marginLeft: '20px' }}>
      <h3>100포인트</h3>
      <h3>구독 : 10일</h3>
    </div>
  </div>
  <div style={{ marginRight: '20px', border: '1px solid #ccc', borderRadius: '12px', padding: '20px', textAlign: 'center', minWidth: '250px' }}>
    <input 
      type="radio" 
      id="option2" 
      name="product" 
      value="option2" 
      checked={selectedOption === 'option2'} 
      onChange={handleRadioChange} 
    />
    <label htmlFor="option2" style={{ marginLeft: '5px', fontSize: '18px' }}>2. 상품</label>
    <div style={{ marginLeft: '20px' }}>
      <h3>200포인트</h3>
      <h3>구독 : 30일</h3>
    </div>
  </div>
  <div style={{ border: '1px solid #ccc', borderRadius: '12px', padding: '20px', textAlign: 'center', minWidth: '250px' }}>
    <input 
      type="radio" 
      id="option3" 
      name="product" 
      value="option3" 
      checked={selectedOption === 'option3'} 
      onChange={handleRadioChange} 
    />
    <label htmlFor="option3" style={{ marginLeft: '5px', fontSize: '18px' }}>3. 상품</label>
    <div style={{ marginLeft: '20px' }}>
      <h3>500포인트</h3>
      <h3>구독 : 60일</h3>
    </div>
  </div>
</div>
      <br />
      <button 
        onClick={requestProductPay} 
        style={{ 
          padding: '10px 20px', 
          backgroundColor: 'black', 
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '5px' // 둥근 모서리 추가
        }}
      >
        상품구매하기
      </button><br />
      <br />
      <br />
      <br />
      <br />
      <br /><br /><br /><br /><br /><br />
      <div className="w-[1920px] h-[264px] relative overflow-hidden bg-white">
  <div className="flex flex-col justify-center items-end w-[187px] absolute left-[1056px] top-12 gap-6">
    <p className="self-stretch flex-grow-0 flex-shrink-0 w-[187px] text-base font-medium text-left text-black">
      Topic
    </p>
    <p className="self-stretch flex-grow-0 flex-shrink-0 w-[187px] text-base font-medium text-left text-[#454545]">
      Page
    </p>
    <p className="self-stretch flex-grow-0 flex-shrink-0 w-[187px] text-base font-medium text-left text-[#454545]">
      Page
    </p>
    <p className="self-stretch flex-grow-0 flex-shrink-0 w-[187px] text-base font-medium text-left text-[#454545]">
      Page
    </p>
  </div>
  <div className="flex flex-col justify-center items-end w-[187px] absolute left-[1355px] top-12 gap-6">
    <p className="self-stretch flex-grow-0 flex-shrink-0 w-[187px] text-base font-medium text-left text-black">
      Topic
    </p>
    <p className="self-stretch flex-grow-0 flex-shrink-0 w-[187px] text-base font-medium text-left text-[#454545]">
      Page
    </p>
    <p className="self-stretch flex-grow-0 flex-shrink-0 w-[187px] text-base font-medium text-left text-[#454545]">
      Page
    </p>
    <p className="self-stretch flex-grow-0 flex-shrink-0 w-[187px] text-base font-medium text-left text-[#454545]">
      Page
    </p>
  </div>
  <div className="flex flex-col justify-center items-end w-[187px] absolute left-[1653px] top-12 gap-6">
    <p className="self-stretch flex-grow-0 flex-shrink-0 w-[187px] text-base font-medium text-left text-black">
      Topic
    </p>
    <p className="self-stretch flex-grow-0 flex-shrink-0 w-[187px] text-base font-medium text-left text-[#454545]">
      Page
    </p>
    <p className="self-stretch flex-grow-0 flex-shrink-0 w-[187px] text-base font-medium text-left text-[#454545]">
      Page
    </p>
    <p className="self-stretch flex-grow-0 flex-shrink-0 w-[187px] text-base font-medium text-left text-[#454545]">
      Page
    </p>
  </div>
  <p className="absolute left-20 top-[52px] text-2xl text-left text-black">Site name</p>
  <div className="flex justify-start items-start absolute left-20 top-44 gap-2">
    <svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-grow-0 flex-shrink-0 w-10 h-10 relative"
      preserveAspectRatio="none"
    >
      <path
        d="M20 10.04C14.5 10.04 10 14.53 10 20.06C10 25.06 13.66 29.21 18.44 29.96V22.96H15.9V20.06H18.44V17.85C18.44 15.34 19.93 13.96 22.22 13.96C23.31 13.96 24.45 14.15 24.45 14.15V16.62H23.19C21.95 16.62 21.56 17.39 21.56 18.18V20.06H24.34L23.89 22.96H21.56V29.96C23.9164 29.5879 26.0622 28.3855 27.6099 26.5701C29.1576 24.7546 30.0054 22.4457 30 20.06C30 14.53 25.5 10.04 20 10.04Z"
        fill="#828282"
      />
    </svg>
    <svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-grow-0 flex-shrink-0 w-10 h-10 relative"
      preserveAspectRatio="none"
    >
      <path
        d="M27 11C27.5304 11 28.0391 11.2107 28.4142 11.5858C28.7893 11.9609 29 12.4696 29 13V27C29 27.5304 28.7893 28.0391 28.4142 28.4142C28.0391 28.7893 27.5304 29 27 29H13C12.4696 29 11.9609 28.7893 11.5858 28.4142C11.2107 28.0391 11 27.5304 11 27V13C11 12.4696 11.2107 11.9609 11.5858 11.5858C11.9609 11.2107 12.4696 11 13 11H27ZM26.5 26.5V21.2C26.5 20.3354 26.1565 19.5062 25.5452 18.8948C24.9338 18.2835 24.1046 17.94 23.24 17.94C22.39 17.94 21.4 18.46 20.92 19.24V18.13H18.13V26.5H20.92V21.57C20.92 20.8 21.54 20.17 22.31 20.17C22.6813 20.17 23.0374 20.3175 23.2999 20.5801C23.5625 20.8426 23.71 21.1987 23.71 21.57V26.5H26.5ZM14.88 16.56C15.3256 16.56 15.7529 16.383 16.0679 16.0679C16.383 15.7529 16.56 15.3256 16.56 14.88C16.56 13.95 15.81 13.19 14.88 13.19C14.4318 13.19 14.0019 13.3681 13.685 13.685C13.3681 14.0019 13.19 14.4318 13.19 14.88C13.19 15.81 13.95 16.56 14.88 16.56ZM16.27 26.5V18.13H13.5V26.5H16.27Z"
        fill="#828282"
      />
    </svg>
    <svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-grow-0 flex-shrink-0 w-10 h-10 relative"
      preserveAspectRatio="none"
    >
      <path
        d="M18 23L23.19 20L18 17V23ZM29.56 15.17C29.69 15.64 29.78 16.27 29.84 17.07C29.91 17.87 29.94 18.56 29.94 19.16L30 20C30 22.19 29.84 23.8 29.56 24.83C29.31 25.73 28.73 26.31 27.83 26.56C27.36 26.69 26.5 26.78 25.18 26.84C23.88 26.91 22.69 26.94 21.59 26.94L20 27C15.81 27 13.2 26.84 12.17 26.56C11.27 26.31 10.69 25.73 10.44 24.83C10.31 24.36 10.22 23.73 10.16 22.93C10.09 22.13 10.06 21.44 10.06 20.84L10 20C10 17.81 10.16 16.2 10.44 15.17C10.69 14.27 11.27 13.69 12.17 13.44C12.64 13.31 13.5 13.22 14.82 13.16C16.12 13.09 17.31 13.06 18.41 13.06L20 13C24.19 13 26.8 13.16 27.83 13.44C28.73 13.69 29.31 14.27 29.56 15.17Z"
        fill="#828282"
      />
    </svg>
    <svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-grow-0 flex-shrink-0 w-10 h-10 relative"
      preserveAspectRatio="none"
    >
      <path
        d="M15.8 10H24.2C27.4 10 30 12.6 30 15.8V24.2C30 25.7383 29.3889 27.2135 28.3012 28.3012C27.2135 29.3889 25.7383 30 24.2 30H15.8C12.6 30 10 27.4 10 24.2V15.8C10 14.2617 10.6111 12.7865 11.6988 11.6988C12.7865 10.6111 14.2617 10 15.8 10ZM15.6 12C14.6452 12 13.7295 12.3793 13.0544 13.0544C12.3793 13.7295 12 14.6452 12 15.6V24.4C12 26.39 13.61 28 15.6 28H24.4C25.3548 28 26.2705 27.6207 26.9456 26.9456C27.6207 26.2705 28 25.3548 28 24.4V15.6C28 13.61 26.39 12 24.4 12H15.6ZM25.25 13.5C25.5815 13.5 25.8995 13.6317 26.1339 13.8661C26.3683 14.1005 26.5 14.4185 26.5 14.75C26.5 15.0815 26.3683 15.3995 26.1339 15.6339C25.8995 15.8683 25.5815 16 25.25 16C24.9185 16 24.6005 15.8683 24.3661 15.6339C24.1317 15.3995 24 15.0815 24 14.75C24 14.4185 24.1317 14.1005 24.3661 13.8661C24.6005 13.6317 24.9185 13.5 25.25 13.5ZM20 15C21.3261 15 22.5979 15.5268 23.5355 16.4645C24.4732 17.4021 25 18.6739 25 20C25 21.3261 24.4732 22.5979 23.5355 23.5355C22.5979 24.4732 21.3261 25 20 25C18.6739 25 17.4021 24.4732 16.4645 23.5355C15.5268 22.5979 15 21.3261 15 20C15 18.6739 15.5268 17.4021 16.4645 16.4645C17.4021 15.5268 18.6739 15 20 15ZM20 17C19.2044 17 18.4413 17.3161 17.8787 17.8787C17.3161 18.4413 17 19.2044 17 20C17 20.7956 17.3161 21.5587 17.8787 22.1213C18.4413 22.6839 19.2044 23 20 23C20.7956 23 21.5587 22.6839 22.1213 22.1213C22.6839 21.5587 23 20.7956 23 20C23 19.2044 22.6839 18.4413 22.1213 17.8787C21.5587 17.3161 20.7956 17 20 17Z"
        fill="#828282"
      />
    </svg>
  </div>
  <svg
    width={1280}
    height={1}
    viewBox="0 0 1280 1"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute left-[79px] top-0"
    preserveAspectRatio="xMidYMid meet"
  >
    <line x1="4.37114e-8" y1="0.5" x2={1280} y2="0.500112" stroke="#E6E6E6" />
  </svg>
</div>
    </div>
    
  );
  
  
};
