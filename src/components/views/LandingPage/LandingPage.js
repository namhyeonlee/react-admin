import React from "react";
import { withRouter, Link } from "react-router-dom";
import BoardMainPage from "../../boardPage/BoardMainPage";

function LandingPage(props) {
  
  const isLogin = props.isLogin
  const onLogout = (e) => {
    e.preventDefault();
    	// sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다
    sessionStorage.removeItem('email')
     props.history.push("/login")
    
  }


  return (
    <div
      style={{
       
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}>
      <h2>시작 페이지</h2>
      {isLogin ?
       
          <button onClick={onLogout}>로그아웃</button>
      
        : <button><Link to="/login">로그인</Link></button>}
      <button><Link to="/register">회원가입</Link></button>
      <BoardMainPage isLogin={isLogin}/>
    </div>
  );
}

export default withRouter(LandingPage);