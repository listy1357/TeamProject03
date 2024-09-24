import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Member_Join.css';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';

const MemberJoin = () => { 
    const [name, setName] = useState(''); // 이름
    const [birth, setBirth] = useState(''); // 생년월일
    const [id, setId] = useState(''); // 아이디
    const [password, setPassword] = useState(''); // 비밀번호
    // 핸드폰 관련 상태
    const [phoneCode, setPhoneCode] = useState('010'); // 핸드폰 국가 코드
    const [phoneFirst, setPhoneFirst] = useState(''); // 핸드폰 중간 번호
    const [phoneSecond, setPhoneSecond] = useState(''); // 핸드폰 끝 번호
    const [eventConsent, setEventConsent] = useState('yes'); // 이벤트 수신 동의 여부
     // 이메일 관련 상태
     const [emailLocalPart, setEmailLocalPart] = useState(''); // 이메일 주소 앞부분
     const [isCustomDomain, setIsCustomDomain] = useState(false); // 직접 입력 여부
     const [emailConsent, setEmailConsent] = useState('yes'); // 이메일 수신 동의 여부
     const [agreed, setAgreed] = useState(false); // 약관동의
     const [personalInfoAgreed, setPersonalInfoAgreed] = useState(false); // 개인정보 동의
     const [domain, setDomain] = useState('gmail.com');// 선택된 도메인
     const [fullEmail, setFullEmail] = useState('');
     const [isEmailValid, setIsEmailValid] = useState(true);
     //주소찾기 API
     const [zipcode, setZipcode] = useState(''); // 우편번호
     const [address, setAddress] = useState(''); // 기본 주소
     const [detailAddress, setDetailAddress] = useState(''); // 상세 주소
     const [isPostcodeOpen, setIsPostcodeOpen] = useState(false); // 주소 검색창 상태
     //비밀번호 체크
     const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 상태
 
     const navigate = useNavigate(); // useNavigate 훅 사용
     useEffect(() => {
        const email = `${emailLocalPart}@${domain}`;
        setFullEmail(email);
        validateEmail(email);
    }, [emailLocalPart, domain]);

    const validateEmail = (email) => {
        // 간단한 이메일 형식 검증 정규 표현식
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailPattern.test(email));
    };
    const handleDomainChange = (e) => {
        setDomain(e.target.value);
        if (e.target.value !== '직접 입력') {
            setDomain(e.target.value);
        }
    };
    const handleJoinSubmit = async (e) => {
        e.preventDefault();
        if (!agreed || !personalInfoAgreed) {
            alert("약관과 개인정보 수집에 모두 동의해 주세요.");
            return;
        }
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const formData = {
            id,
            email: `${emailLocalPart}@${domain || "직접 입력된 도메인"}`,
            password,
            name,
            phoneNumber: `${phoneCode}-${phoneFirst}-${phoneSecond}`,
            zipcode,
            address,
            detailAddress,
            birth,
                   
            // 추가적인 회원가입 정보
        };
        
        try {
            // 백엔드에 POST 요청을 보내는 부분
            const response = await axios.post('http://localhost:8080/api/members/join', formData);
            console.log(response.data); // 서버 응답 확인
            alert('회원가입이 완료되었습니다.');
            navigate('/login'); // 로그인 페이지로 이동
        } catch (error) {
            console.error('회원가입 중 오류가 발생했습니다.', error);
            alert('회원가입 중 오류가 발생했습니다.');
        }
    };
    // id중복체크
    const handleDuplicateCheck = async () => {
        try {
            const response = await axios.get(`localhost:8080/api/members/check-id/${id}`);
            if (response.data.exists) {
                alert("이미 존재하는 아이디입니다.");
            } else {
                alert("사용 가능한 아이디입니다.");
            }
        } catch (error) {
            console.error("아이디 중복 체크 중 오류가 발생했습니다.", error);
            alert("아이디 중복 체크 중 오류가 발생했습니다.");
        }
    };

    
    


    //주소찾기 api 이벤트 
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') extraAddress += data.bname;
            if (data.buildingName !== '') extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        setZipcode(data.zonecode);
        setAddress(fullAddress);
        setIsPostcodeOpen(false); // 검색창 닫기
    };
    
    const handlePostcodeOpen = () => {
        setIsPostcodeOpen(true); // 우편번호 검색창 열기
    };

    return (
        <div className='join-background'>
            <div className='join-container'>
                <div className='join-header'>
                    <img src={require('../image/gunlogo.png')} alt="로고" width="150px" className='join-search-logo'/>
                    <div className="join-header-text">
                        <div style={{ fontSize: '40px', fontWeight: 'bold' }}>회원가입</div>
                        <div style={{ fontSize: '15px', color: 'gray' }}>건드샵에 오신걸 환영합니다</div>
                    </div>
                </div>
                
                {/* 단계별 진행 디자인 */}
                <div className="join-step-container">
                    <div className="join-step-01">
                        STEP 01<br />
                        <span>약관동의 및 개인정보입력</span>
                    </div>
                    <div className="join-step-02">
                        STEP 02<br />
                        <span>회원가입 완료</span>
                    </div>
                </div>

                <br></br>

                <div style={{ borderBottom: '2px solid black', marginTop: '5px', width: '100%' }}></div>
                
                {/* 약관 동의와 개인정보 수집 동의 섹션 */}
                <div className="join-terms-container">
                    <div className="join-terms-box">
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>건드샵 이용약관</div>
                        <div style={{ fontSize: '10px', color: 'gray', marginTop: '10px'}}>
                            회원에 가입하시기 전 아래의 약관을 꼭 읽어봐 주시고, 동의를 해주시기 바랍니다
                        </div>
                        <textarea readOnly className="join-terms-textarea">
                            [이용약관 내용]...
                        </textarea>
                        <div className="join-terms-agree">
                            <div className="join-agree-content">
                                <input 
                                    type="checkbox" 
                                    checked={agreed} 
                                    onChange={() => setAgreed(!agreed)} 
                                />
                                <label style={{ fontSize: '15px', fontWeight: 'bold'}}>건드샵 회원 이용약관 동의</label>
                                <a href="/terms" className="join-details-button">자세히 보기</a>
                            </div>
                        </div>
                    </div>

                    <br></br>
                    <br></br>

                    <div style={{ borderBottom: '2px solid black', marginTop: '5px', width: '100%' }}></div>

                    <br></br>
                    <br></br>
                    <div className="join-terms-box">
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>개인정보 수집 및 이용에 대한 안내</div>
                        <div style={{ fontSize: '10px', color: 'gray', marginTop: '10px'}}>
                            회원에 가입하시기 전 아래의 약관을 꼭 읽어봐 주시고, 동의를 해주시기 바랍니다
                        </div>
                        <textarea readOnly className="join-terms-textarea">
                            [개인정보 수집 및 이용에 대한 내용]...
                        </textarea>
                        <div className="join-terms-agree">
                            <div className="join-agree-content">
                                <input 
                                    type="checkbox" 
                                    checked={personalInfoAgreed} 
                                    onChange={() => setPersonalInfoAgreed(!personalInfoAgreed)} 
                                />
                                <label style={{ fontSize: '15px', fontWeight: 'bold'}}>개인정보 수집 및 이용 동의</label>
                                <a href="/privacy" className="join-details-button">자세히 보기</a>
                            </div>
                        </div>
                    </div>
                </div>

                <br></br>
                <br></br>

                <div style={{ borderBottom: '2px solid black', marginTop: '5px', width: '100%' }}></div>

                <br></br>
                <br></br>

                {/* 개인정보 입력 폼 (표 형식) */}
                <div className='join-step'>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>개인정보 입력</div>
                    <br></br>
                    <div style={{ borderBottom: '2px solid black', marginTop: '5px', width: '100%' }}></div>
                    <form onSubmit={handleJoinSubmit} className="join-form-table">
                        <div className="join-form-row">
                                < label>이름</label>
                                <div className='join-name'>
                                    <input 
                                        type='text' 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                        className="joinname"
                                    />
                                    <span className="join-input-description">[*실명 입력]</span>
                                </div>
                        </div>
                        <div className="join-form-row">
                                 <label>생년월일</label>
                                 <div className='join-birth'>
                                    <input 
                                        type='date' 
                                        value={birth} 
                                        onChange={(e) => setBirth(e.target.value)} 
                                        className="joinbirth"
                                    />
                                </div> 
                        </div>
                        <div className="join-form-row">
                            <label>아이디</label>
                            <div className='join-id'>
                                <input 
                                    type='text' 
                                    value={id} 
                                    onChange={(e) => setId(e.target.value)} 
                                    className="joinid"
                                />
                                <button type="button" className="join-duplicate-check-button" onClick={handleDuplicateCheck}>
                                    중복체크
                                </button>
                                <span className="join-input-description">[영숫자조합 6~15자리]</span>
                            </div>
                        </div>

                        <div className="join-form-row">
                            <label>비밀번호</label>
                            <div className='join-paw'>
                                <input 
                                    type='password' 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    className="joinpassword"
                                />
                                <span className="join-input-description">[영숫자조합 6~15자리]</span>
                                <input 
                                    type='password' 
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                    className="joinpasswordconfirm"
                                />
                                <span className="join-input-description">[한번 더 입력]</span>
                            </div>
                        </div>
                        <div className="join-form-row">
                            <label>핸드폰번호</label>
                            <div className='join-phone'>
                                <select className="join-phone-select" value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)}>
                                    <option value="010">010</option>
                                    <option value="011">011</option>
                                    <option value="016">016</option>
                                    <option value="017">017</option>
                                    <option value="018">018</option>
                                    <option value="019">019</option>
                                    <option value="070">070</option>
                                    <option value="0505">0505</option>
                                </select>
                                <div className='joinhipon'>-</div>
                                <input 
                                    type="text" 
                                    className="joinphonefirst" 
                                    value={phoneFirst} 
                                    onChange={(e) => setPhoneFirst(e.target.value)} 
                                    maxLength="4"
                                />
                                <div className='joinhipon'>-</div>
                                <input 
                                    type="text" 
                                    className="joinphonesecond" 
                                    value={phoneSecond} 
                                    onChange={(e) => setPhoneSecond(e.target.value)} 
                                    maxLength="4"
                                />
                                <span className="join-input-description">이벤트/쿠폰/광고/문자</span>
                                <div className='join-pn-raido'></div>
                                    <div className='join-radio1'>
                                        <input type="radio" 
                                            name="eventConsent" 
                                            value="yes" 
                                            checked={eventConsent === "yes"} 
                                            onChange={() => setEventConsent("yes")}
                                        /> 동의
                                    </div>
                                    <div className='join-radio2'>
                                        <input type="radio" 
                                            name="eventConsent" 
                                            value="yes" 
                                            checked={eventConsent === "yes"} 
                                            onChange={() => setEventConsent("yes")}
                                        /> 비동의
                                    </div>
                                <span className="join-input-description2">
                                (주문/배송 문자는 수신 여부에 상관없이 발송됩니다.)
                                </span>
                            </div>
                        </div>
                        <div className="join-form-row">
                            <label>집주소</label>
                            <div className='join-address-block'>
                            <div className="join-address-group">
                                    <input 
                                        type="text" 
                                        className="join-address-input" 
                                        value={zipcode} 
                                        placeholder="우편번호" 
                                        readOnly
                                    />
                                    <button type='button' className="join-address-find" onClick={handlePostcodeOpen}>우편번호 찾기</button>
                                    <span className="join-input-description2">(주문상품 or 이벤트 상품 발송주소지 입니다)</span>
                                </div>
                                <div className="join-address-details">
                                    <input 
                                        type="text" 
                                        className="join-address-full" 
                                        placeholder="기본 주소를 입력하세요" 
                                        value={address} 
                                        readOnly
                                    />
                                    <input 
                                        type="text" 
                                        className="join-address-full" 
                                        placeholder="상세 주소를 입력하세요" 
                                        value={detailAddress} 
                                        onChange={(e) => setDetailAddress(e.target.value)} 
                                    />
                                </div>
                                <div>

                                    {/* 주소 검색창 */}
                                    {isPostcodeOpen && (
                                        <DaumPostcode
                                            onComplete={handleComplete}
                                            autoClose={false}
                                            style={{ width: '100%', height: '500px' }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                          {/* 이메일 주소 입력 */}
                        <div className="join-form-row">
                            <label>이메일주소</label>
                            <div className="join-email-group">
                                <input 
                                    type="text" 
                                    className="join-email-input" 
                                    value={emailLocalPart} 
                                    onChange={(e) => setEmailLocalPart(e.target.value)} 
                                    placeholder="이메일 입력"
                                />
                                <span className="join-at">@</span>
                                <select className="join-email-domain" value={domain} onChange={handleDomainChange}>
                                    <option value="">선택하세요</option>
                                    <option value="gmail.com">gmail.com</option>
                                    <option value="naver.com">naver.com</option>
                                    <option value="daum.net">daum.net</option>
                                    <option value="직접 입력">직접 입력</option> {/* 직접 입력 옵션 */}
                                </select>
                                <input 
                                    type="text" 
                                    className="join-email-input2" 
                                    value={domain} 
                                    onChange={(e) => setDomain(e.target.value)} 
                                    placeholder="도메인 입력"
                                />
                                <span className="join-input-description2">(주문/배송안내 및 ID/PW 분실시 사용되는 메일입니다)</span>
                            </div>
                            
                            <div className="join-email-radio">
                                <div>
                                    <input 
                                        type="radio" 
                                        name="emailConsent" 
                                        value="yes" 
                                        checked={emailConsent === "yes"} 
                                        onChange={() => setEmailConsent("yes")}
                                    /> 수신동의(신상품안내)
                                </div>
                                <div className='join-radio2'>
                                    <input 
                                        type="radio" 
                                        name="emailConsent" 
                                        value="no"
                                        checked={emailConsent === "no"} 
                                        onChange={() => setEmailConsent("no")}
                                    /> 받지않음
                                </div>
                            </div>
                        </div>

                        <button type='submit' className='join-join' onClick={handleJoinSubmit}>회원 가입</button>
                    </form>
                </div>
            </div>
        </div>
    ); 
};

export default MemberJoin;
