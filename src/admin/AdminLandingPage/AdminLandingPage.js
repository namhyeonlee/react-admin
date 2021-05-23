import React, { useState, useEffect}from "react";
import { withRouter, Link } from "react-router-dom";
import axios from 'axios';
import AdminNav from './AdminNav';

function AdminLandingPage(props) {
      const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(false);

  
    
    const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
    const onPasswordHanlder = (e) => {
    setPassword(e.currentTarget.value);
    };
    
    const onSubmitHandler = (e) => {
    e.preventDefault();

     const param = new URLSearchParams;
    param.append("email", Email);
    param.append("password", Password);

     axios.post('http://localhost:4000/login', param)
       .then((res) => {
         console.log(res)
         if (res.data.email === undefined) {
           console.log("email:", res.data.email)
           alert('입력하신 아이디가 일치하지 않습니다.')
         } else if (res.data.email === null) {
           // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
                alert('입력하신 비밀번호 가 일치하지 않습니다.')

         } else if (res.data.email === Email){
           // id, pw 모두 일치 userId = userId1, msg = undefined
                sessionStorage.setItem('email', Email)
                alert("로그인 성공")
                props.history.push("/adminLandingPage")
         }
       
  
      })

  };
  return (
    <>
      <AdminNav/>
        <div>
           
        {sessionStorage.getItem('email') ? (
          null
            )
          : (
            <div>
              <h3 style={{textAlign:"center", marginTop:"100px"}}>관리자 로그인</h3>
                <form className="adminLoginForm" onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} maxlength="20"/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHanlder} maxlength="20" />
                <button
          type="submit"
          style={{marginBottom:"10px"}}
        >
          Login</button>
            </form>
            </div>
                )
            }
  
      </div>
      </>

    )
}

export default withRouter(AdminLandingPage);