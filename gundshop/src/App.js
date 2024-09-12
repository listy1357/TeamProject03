import { useState } from "react"
import { Container, Nav, Navbar } from './react-bootstrap';
import './App.css';
import mg from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from "./pages/Detail.js";
import Login from "./pages/Login.js";



function App() {

  let [MG] = useState(mg)
  let navigate = useNavigate();

  return (
    <div className="App">

      <Navbar bg="dark" data-bs-theme="dark">
              <Container>
                <Navbar.Brand href="#home">GundShop</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link onClick={()=>{ navigate('/') }}>홈</Nav.Link>
                  <Nav.Link onClick={()=>{ navigate('/login') }}>로그인</Nav.Link>
                  <Nav.Link href="#features">회원가입</Nav.Link>
                  <Nav.Link onClick={()=>{ navigate('/detail') }}>상세페이지</Nav.Link>
                </Nav>
              </Container>
      </Navbar>

      

      <Routes>
        <Route path="/" element={
          <>
          <div className="main-bg"></div>
          <div className="container">
            <div className="row">
              {/* <Card MG={MG[1]} i={1}></Card> 
              <Card MG={MG[2]} i={2}></Card>  */}
              {
                MG.map((a, i)=>{
                  return (
                    <Card MG={MG[i]} i={i}></Card> 
                  )
                })
              }
            </div>
          </div> 
          </>
        }/>
        <Route path="/detail/:id" element={<Detail MG={MG} />} />

        <Route path="/login" element={<Login/>} />

        <Route path="/about" element={<About/>}> 
          <Route path="member" element={<div>맴버</div>} />
          <Route path="location" element={<div>위치정보</div>} />
        </Route>

        <Route path="/event" element={<Event/>}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰 받기</div>} />
        </Route>

        {/* 위에 코드와 같다
        <Route path="/about/member" element={<About/>} />
        <Route path="/about/location" element={<About/>} /> */}

        {/* 404 페이지 (오타시 나오는 화면) */}
        <Route path="*" element={<div>없는페이지 입니다.</div>}/>

        <Route />
      </Routes>
    </div>
  );
}

function About(){
  return (
    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Event(){
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props) {
  return (
    <div className="col-md-4">
              <img src={process.env.PUBLIC_URL + '/images/mg' + (props.i+1) + '.jpg'}/>
              <p>{ props.MG.gundam_series }</p>
              <h5>{ props.MG.gundam_name}</h5>
              <h4>{ props.MG.price}</h4>
          </div>     
  );
}

export default App;
