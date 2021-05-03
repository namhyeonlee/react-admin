import React, { useState } from "react";
import { withRouter } from "react-router-dom";
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

  const onSubmitHandler = (e) => {
    e.preventDefault();

     const param = new URLSearchParams;
    param.append("email", Email);
    param.append("password", Password);

     axios.post('http://localhost:4000/login', param)
       //dispatch(loginUser(param))
       .then((res) => {
         console.log(res)
        //  console.log('res.data.eamil :: ', res.data.email)
        //  console.log('res.data.msg :: ', res.data.msg)

         if (res.data.email === undefined) {
              console.log('======================',res.data.msg)
           alert('입력하신 id 가 일치하지 않습니다.')
         } else if (res.data.email === null) {
           // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
           // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
                console.log('======================','입력하신 비밀번호 가 일치하지 않습니다.')
                alert('입력하신 비밀번호 가 일치하지 않습니다.')

         } else if (res.data.email === Email){
           // id, pw 모두 일치 userId = userId1, msg = undefined
                console.log('======================','로그인 성공')
                sessionStorage.setItem('email', Email)
                alert("로그인 성공")
                props.history.push("/main")

           
         }
       
        //  if (response.data.length===0) {
        //    setLoginStatus("this is wrong")
        //  } else {
        //    setLoginStatus(response.data[0].email)
        //  }
         
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
        <button>아이디 찾기</button>
        <button>비밀번호 찾기</button>
      </form>
      {/* <div><h1>{ LoginStatus }</h1></div> */}
    </div>
  );
}

export default withRouter(LoginPage);