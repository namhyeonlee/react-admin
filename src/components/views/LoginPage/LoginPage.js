import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import {loginUser} from '../../../store/actions/UserAction'
import axios from 'axios'

function LoginPage(props) {


  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [LoginStatus, setLoginStatus] = useState("")
  const dispatch = useDispatch();
 

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onPasswordHanlder = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onFindidHandler = (e) => {
     e.preventDefault();
    props.history.push("/id")
  }
   const onFindpasswordHandler = (e) => {
     e.preventDefault();
    props.history.push("/pass")
  }

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
                props.history.push("/")
         }
       
  
      })

  };


  return (
    <div
      className="login"
      style={{
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}>
      <form
        onSubmit={onSubmitHandler}
        style={{ display: "flex", flexDirection: "column" }}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} maxlength="20"/>
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHanlder} maxlength="20" />
        <br />
        <button
          type="submit"
          style={{marginBottom:"10px"}}
        >
          Login</button>
      </form>
      <div style={{display:"block"}}>

      <button onClick={onFindidHandler} style={{marginBottom:"10px", display:"block",  width:"153px"}}>아이디 찾기</button>
        <button onClick={onFindpasswordHandler} style={{marginBottom:"10px", display:"block",  width:"153px"}}>비밀번호 찾기</button>
        <button style={{ width:"153px"}}><Link to="/" style={{ textDecoration: 'none',color:"black"}}>home</Link></button>
        </div>
    </div>
  );
}

export default withRouter(LoginPage);