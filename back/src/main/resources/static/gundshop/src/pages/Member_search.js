import React, { useState } from 'react';
import '../css/Member_search.css';

const MemberSearch = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [id, setId] = useState('');

    return (
        <div className='search-background'>
            <div className='search-form'>
                <div className='search-header'>
                    <img src={require('../image/gunlogo.png')} alt="로고" className='search-logo'/>
                    <div style={{ fontSize: '40px', fontWeight: 'bold', marginLeft: '10px' }}>아이디/비밀번호 찾기</div>
                </div>
                <div style={{ fontSize: '15px', color: 'white', marginTop: '-50px', marginRight: '350px' }}>
                    회원 아이디와 비밀번호를 잊으셨나요?
                </div>
                <br></br>
                <br></br>
                <div style={{ borderBottom: '2px solid black', marginTop: '5px', width: '100%' }}></div>
                <div className='search-container'>
                    {/* 아이디 찾기 */}
                    <div className='search-section'>
                        <div className='search-mid'>아이디 찾기</div>
                        
                        <div className='search-group'>
                            <label className='search-label'>이름 </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='search-input'
                                placeholder='이름을 입력해주세요'
                                required
                            />
                        </div>
                        
                        <div className='search-group'>
                            <select className='search-select'>
                                <option value="email">이메일</option>
                                <option value="phone">핸드폰</option>
                            </select>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='search-input'
                                placeholder='이메일 또는 핸드폰 입력해주세요'
                                required
                            />
                        </div>
                        
                        <button className='search-button'>확인</button>
                        <label className='search-label2'>회원가입시 입력한 연락처 정보로 아이디를 보내드립니다.</label>

                    </div>

                    {/* 비밀번호 찾기 */}
                    <div className='search-section'>
                        <div className='search-mid'>비밀번호 찾기</div>
                        
                        <div className='search-group'>
                            <label className='search-label'>아이디</label>
                            <input
                                type="text"
                                id="id"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                className='search-input'
                                placeholder='아이디를 입력해주세요'
                                required
                            />
                        </div>

                        <div className='search-group'>
                            <label className='search-label'>이름</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='search-input'
                                placeholder='이름을 입력해주세요'
                                required
                            />
                        </div>

                        <div className='search-group'>
                            <select className='search-select'>
                                <option value="email">이메일</option>
                                <option value="phone">핸드폰</option>
                            </select>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='search-input'
                                placeholder='이메일 또는 핸드폰 입력해주세요'
                                required
                            />
                        </div>
                        
                        <button className='search-button'>확인</button>
                        <label className='search-label2'>회원가입시 입력한 연락처 정보로 (임시)비밀번호를 보내드립니다.</label>
                    </div>
                </div>
            </div>
        </div>
    ); 
};

export default MemberSearch;
