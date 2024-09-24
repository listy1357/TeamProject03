import React, { useState, useEffect } from 'react';
import '../css/LoginForm.css'
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const LoginForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동

  useEffect(() => {
    const savedId = localStorage.getItem('rememberedId');
    if (savedId) {
      setId(savedId);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('id:', id);
    console.log('Password:', password);
    
try {
      const response = await axios.post('http://localhost:8080/api/members/login', {
        id: id,
        password: password
      });

      // 로그인 성공 시 메인 페이지로 이동
      if (response.status === 200) {
        alert('로그인 성공: 어서오세요!');
        navigate('/'); // 메인 페이지로 리디렉션
      }

      if (rememberMe) {
        localStorage.setItem('rememberedId', id);
      } else {
        localStorage.removeItem('rememberedId');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      // 에러 처리 추가 가능 (예: 알림 표시)
    }
  };

  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };


  return (
    <div className='login-background'>
      <div className='login-form'>
          <div className='login-header'>
               <img src={require('../image/gunlogo.png')} alt="로고" className='search-logo'/>
               <div style={{ fontSize: '50px', fontWeight: 'bold', marginLeft: '10px' }}>로그인</div>
          </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className='login-id'
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
              className='login-pw'
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
              아이디저장
            </label>
            <Link to="/search" className='login-search'>아이디/비밀번호 찾기</Link> 
          </div>
          <button type="submit" className='login-login'>로그인</button>
        </form>
        <Link to="/join" className='login-join'>회원가입</Link> 
      </div>
    </div>
  );
};

export default LoginForm;
