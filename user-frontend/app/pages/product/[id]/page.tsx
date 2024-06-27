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
import { create } from 'domain';
import { duration } from '@mui/material';
import { ChangeSubscribe } from '@/app/component/subcribe/service/subcribe-service';
import { subscribe } from 'diagnostics_channel';

export default function Payment({ params }: any) {
  const dispatch = useDispatch();
  const user: IUser = useSelector(getUserById);
  const [selectedOption, setSelectedOption] = useState<'option1' | 'option2' | 'option3'>('option1');
  const merchant_uid = new Date().getTime().toString();

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

  const requestPay = async (selectedProduct: any) => {
    window.IMP.init(process.env.NEXT_PUBLIC_IAMPORT_API_KEY); // Iamport 가맹점 식별코드

    window.IMP.request_pay(
      {
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: merchant_uid, // 주문 번호
        name: selectedProduct.name,
        amount: selectedProduct.price, // Use the selected product price
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
              const subscribeDate = {
                userId: params.id,
                productId: selectedProduct.id,
                createdAt: new Date(),
                endDate : new Date(new Date().getTime() + selectedProduct.duration * 24 * 60 * 60 * 1000)
              }
              dispatch(ChangeSubscribe(subscribeDate)).then((res: any) => {
                console.log('구독 변경 완료');
                console.log(res.payload.message);
                // 상품 결제
              const productData = {
                userId: params.id,
                subscribeId : res.payload.subscribeId,
                productId: selectedProduct.id,
                amount: selectedProduct.price,
                name: selectedProduct.name,
                subscribeDate: selectedProduct.subscribe,
                paymentUid : rsp.imp_uid,
                createdAt: new Date(),
                status: 'OK'
              };
              dispatch(paymentproduct(productData))
                .then((res: any) => {
                  console.log('상품 결제 전송 완료');
                  console.log(res.payload.paymentId.toString());
                  if (res.payload.message === "SUCCESS") {
                    alert('상품결제 성공');
                    
                  } else {
                    alert('상품결제 실패');
                    alert(res.payload.message);
                  }
                })
                .catch((err: any) => {
                  console.log("상품결제 실패", err);
                });

              alert('결제 성공');
              }).catch((err: any) => {
                console.log("구독 변경 실패", err);
              });
              
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
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value as 'option1' | 'option2' | 'option3');
  };

  const handlePurchaseClick = () => {
    const products = {
      option1: { id: 1, name: '상품 1', price: 100, duration: 10 },
      option2: { id: 2, name: '상품 2', price: 200, duration: 30 },
      option3: { id: 3, name: '상품 3', price: 500, duration: 60 }
    };

    const selectedProduct = products[selectedOption];

    if (!selectedProduct) {
      alert('유효한 상품을 선택하세요.');
      return;
    } else {
      requestPay(selectedProduct);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
        onClick={handlePurchaseClick}
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
      </button>
    </div>
  );
}
