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
           alert('입력하신 id 가 일치하지 않습니다.')
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
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}>
      <form
        onSubmit={onSubmitHandler}
        style={{ display: "flex", flexDirection: "column" }}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHanlder} />
        <br />
        <button
          type="submit"
        >
          Login</button>
      </form>
      <div style={{ display: "flex", flexDirection: "column"}}>
       <button onClick={onFindidHandler}>아이디 찾기</button>
        <button onClick={onFindpasswordHandler}>비밀번호 찾기</button>
        <button><Link to="/">home</Link></button>
      </div>
      {/* <div><h1>{ LoginStatus }</h1></div> */}
    </div>
  );
}

export default withRouter(LoginPage);