import React from 'react';
import { withRouter, Link } from "react-router-dom";

function Nav(props) {
    const onLogout = (e) => {
    e.preventDefault();
    	// sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다
        sessionStorage.removeItem('email')
        document.location.href='/login'
    //  props.history.push("/login")
  }
    return (
        <nav className="nav">
         <Link to="/" style={{ textDecoration: 'none',color:"black"}}><h2>logo</h2></Link>
       

        <div style={{ marginLeft: "30px" }}>
          
      {sessionStorage.getItem('email') ?
       
          <button onClick={onLogout}>로그아웃</button>
      
        : (
          <>
            <button style={{marginRight:"20px"}}><Link to="/login" style={{ textDecoration: 'none',color:"black"}}>로그인</Link></button>
            <button><Link to="/register" style={{ textDecoration: 'none',color:"black"}}>회원가입</Link></button>
            </>
            )}
          </div>
        </nav>
    )
}

export default Nav;