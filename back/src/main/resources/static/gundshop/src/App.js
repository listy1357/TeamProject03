import { useState } from "react";
import { Navbar, Container, Nav, Dropdown, Carousel } from 'react-bootstrap';
import './App.css';
import mg from './pages/data.js';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Detail from "./pages/Detail.js";
import Login from "./pages/Login.js";
import MemberSearch from './pages/Member_search';
import MemberJoin from './pages/Member_Join';
import Footer from './pages/Footer';
import AdminProductForm from './pages/AdminProductForm';
import AdminPage from './pages/AdminPage';
import Checkout from './pages/Checkout'; // Checkout 페이지 추가


function App() {
  let [MG] = useState(mg);
  let [filteredItems, setFilteredItems] = useState(mg); // 필터링된 항목 상태 추가
  let navigate = useNavigate();

  // Dropdown의 hover 상태를 관리하는 state
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  // MG와 RG 필터링 함수
  const filterBySeries = (series) => {
    const filtered = MG.filter(item => item.gundam_name.startsWith(series));
    setFilteredItems(filtered);
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand onClick={() => { navigate('/') }} style={{ cursor: 'pointer' }}>
            GundShop
          </Navbar.Brand>
          <Nav className="me-auto">
            <Dropdown
              show={showDropdown}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                건담 프라모델 . 기타
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {/* MG와 RG에 대한 필터링 기능 추가 */}
                <Dropdown.Item onClick={() => filterBySeries('')}>전체 보기</Dropdown.Item>
                <Dropdown.Item onClick={() => filterBySeries('MG')}>MG</Dropdown.Item>
                <Dropdown.Item onClick={() => filterBySeries('RG')}>RG</Dropdown.Item>
                <Dropdown.Item onClick={() => filterBySeries('HG')}>HG</Dropdown.Item>
                <Dropdown.Item onClick={() => { navigate('/adminproductForm') }}>상품 추가 게시판 (임시)</Dropdown.Item>
                <Dropdown.Item onClick={() => { navigate('/adminpage') }}>상품 추가 게시판 (임시, 관리자)</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>

          <Nav className="ms-auto">
            <Nav.Link onClick={() => { navigate('/login') }}>로그인</Nav.Link>
            <Nav.Link onClick={() => { navigate('/join') }}>회원가입</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <>
            <Carousel className="main-bg">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={process.env.PUBLIC_URL + '/images/bg.jpg'}
                  alt="Slide 1"
                />
                <Carousel.Caption style={{ fontSize: '38px', fontWeight: 'bold'}}>
                  건담 X 신한카드 이벤트 바로가기
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={process.env.PUBLIC_URL + '/images/bnr_top_pc.jpg'}
                  alt="Slide 2"
                />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={process.env.PUBLIC_URL + '/images/seedfree.jpg'}
                  alt="Slide 3"
                />
                <Carousel.Caption style={{ fontWeight: 'bold' }}>
                  <p style={{ fontSize: '15px' }}>기동전사 건담</p>
                  <h2 style={{ fontSize: '38px' }}>SEED FREEDOM!</h2>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>

            <div className="container">
              <div className="row">
                {
                  filteredItems.map((a, i) => {
                    return (
                      <Card MG={filteredItems[i]} i={i} key={i} navigate={navigate}></Card>
                    );
                  })
                }
              </div>
            </div>
          </>
        } />
        <Route path="/detail/:id" element={<Detail MG={MG} />} />
        <Route path="/checkout" element={<Checkout />} /> {/* 결제 페이지 경로 추가 */}
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<MemberSearch />} />
        <Route path="/join" element={<MemberJoin />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/adminproductForm" element={<AdminProductForm />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="*" element={<div>없는페이지 입니다.</div>} />
      </Routes>
      <Footer />
    </div>
  );
}

function Card(props) {
  return (
    <div 
      className="col-md-4" 
      onClick={() => { props.navigate(`/detail/${props.MG.id}`) }} 
      style={{ cursor: 'pointer', marginTop: '70px', marginBottom: '20px'  }}  
    >
      {/* 상품 기본 이미지 */}
      <img src={process.env.PUBLIC_URL + `/images/mg${props.MG.id}.jpg`} alt="Gundam Model" width="100%" />
      <p>{props.MG.gundam_series}</p>
      <h5>{props.MG.gundam_name}</h5>
      <h4>{props.MG.price}</h4>
    </div>
  );
}

export default App;
