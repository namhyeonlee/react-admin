import React from "react";
import { withRouter } from "react-router-dom";
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
      <button onClick={onLogout}>로그아웃</button>
      <BoardMainPage/>
    </div>
  );
}

export default withRouter(LandingPage);