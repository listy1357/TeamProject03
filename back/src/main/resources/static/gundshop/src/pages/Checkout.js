import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/Checkout.css';

function Checkout() {
  const location = useLocation();
  const { productName, productImage, productPrice, quantity } = location.state;
  const totalPrice = productPrice * quantity;
  
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [coupon, setCoupon] = useState('');

  return (
    <div className="checkout-checkout-container">
      <div className="checkout-checkout-steps">
        <div className="checkout-step">STEP 1<br />장바구니</div>
        <div className="checkout-step checkout-step-active">STEP 2<br />주문/결제</div>
        <div className="checkout-step">STEP 3<br />주문완료</div>
      </div>

      <div className="checkout-order-list-section">
        <h3>주문리스트</h3>
        <div className="checkout-order-item">
          <img src={productImage} alt="상품 이미지" />
          <div className="checkout-order-details">
            <p>상품명: {productName}</p>
            <p>수량: {quantity}개</p>
            <p>상품 금액: {productPrice}원</p>
          </div>
        </div>

        <div className="checkout-summary">
          <p>상품 총 금액: {productPrice * quantity}원</p>
          <p>총 배송비: 3,000원</p>
          <p>결제 예정 금액: {totalPrice + 3000}원</p>
        </div>
      </div>

      <div className="checkout-address-section">
        <h3>배송지 정보 입력</h3>
        <label>주소</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="checkout-input" />
        <label>이메일</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="checkout-input" />
        <label>연락처</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="checkout-input" />
      </div>

      <div className="checkout-discount-section">
        <h3>할인 내역 입력</h3>
        <label>쿠폰</label>
        <input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)} className="checkout-input" />
        <p>적립금: 0원</p>
      </div>

      <div className="checkout-payment-section">
        <h3>결제 정보</h3>
        <p>상품 금액: {productPrice * quantity}원</p>
        <p>배송비: 3,000원</p>
        <h4>총 결제 금액: {totalPrice + 3000}원</h4>
        <button className="checkout-btn checkout-btn-primary">결제하기</button>
      </div>
    </div>
  );
}

export default Checkout;
