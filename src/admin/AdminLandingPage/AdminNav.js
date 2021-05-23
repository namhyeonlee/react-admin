import React from 'react';
import { Link } from "react-router-dom";

function AdminNav(props) {
    const onLogout = (e) => {
    e.preventDefault();
    	// sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다
        sessionStorage.removeItem('email')
        document.location.href='/adminLandingPage'
 
  }
    return (
        <nav className="nav">
         <Link to="/adminLandingPage" style={{ textDecoration: 'none',color:"black"}}><h2>Admin</h2></Link>
       

        <div style={{ marginLeft: "30px" }}>
          
      {sessionStorage.getItem('email') ?
       
          (<div className="adminNavButton">
                
                <button><Link to='/adminMemberPage' style={{ textDecoration: 'none', color:"black"}}>memberlist</Link ></button>
                <button><Link to='/adminBoardPage' style={{ textDecoration: 'none',color:"black"}}>board</Link></button>
                <button onClick={onLogout}>로그아웃</button>
          </div>
      )
        : (
          null
            )}
          </div>
        </nav>
    )
}

export default AdminNav
;