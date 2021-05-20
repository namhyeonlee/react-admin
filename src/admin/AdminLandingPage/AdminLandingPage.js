import React, { useState, useEffect}from "react";
import { withRouter, Link } from "react-router-dom";
import axios from 'axios';

function AdminLandingPage(props) {
      const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(false);

  
    
     const onLogout = (e) => {
    e.preventDefault();
    	// sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다
         sessionStorage.removeItem('email')
         setIsLogin(false)
    
  }
    
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
        <div>
            <h1>admin</h1>
           
            {sessionStorage.getItem('email') ? (<div>
                <button onClick={onLogout}>logout</button>
                <button><Link to='/adminMemberPage'>memberlist</Link></button>
                <button><Link to='/adminBoardPage'>board</Link></button></div>)
                : (
                     <form style={{marginTop:"100px"}} onSubmit={onSubmitHandler}>
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
                    
                )
            }
            

            {/* <form style={{marginTop:"100px"}} onSubmit={onSubmitHandler}>
                 <label>Email</label>
                 <input type="email" value={Email} onChange={onEmailHandler} maxlength="20"/>
                 <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHanlder} maxlength="20" />
                <button
          type="submit"
          style={{marginBottom:"10px"}}
        >
          Login</button>
            </form> */}
  
        </div>

    )
}

export default withRouter(AdminLandingPage);