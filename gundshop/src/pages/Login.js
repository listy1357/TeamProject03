// src/LoginForm.js
import React, { useState, useEffect } from 'react';
import '../LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 이메일 불러오기
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    // 아이디 저장 체크박스가 체크된 경우 로컬 스토리지에 이메일 저장
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
  };

  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div className='background'> {/* 배경 이미지가 적용될 요소 */}
      <div className='login-form'> {/* 로그인 폼만 별도로 배치 */}
        <h2 className='login-main'>로그인</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='아이디를 입력해주세요'
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='비밀번호를 입력해주세요'
              required
            />
          </div>
          <div>
            <label className='logincheck'>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleCheckboxChange}
              />
              아이디 저장
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
