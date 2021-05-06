import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios'


function ChangePasswordPage(props) {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ChangePassword, setChangePassword] = useState("");
    const [ConfirmPasword, setConfirmPasword] = useState("");
    

    const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

    const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
    const onChangePasswordHandler = (e) => {
    setChangePassword(e.currentTarget.value);
    };
    
     const onConfirmPasswordHandler = (e) => {
    setConfirmPasword(e.currentTarget.value);
    };
    
    const onSubmitHandler = (e) => {
        e.preventDefault();

        const param = new URLSearchParams;
        param.append("email", Email);
        param.append("password", Password);
        param.append("changePass", ChangePassword);

        axios.post('http://localhost:4000/change_pw', param)
                 .then((res) => {
                   console.log(res)
                   alert("비밀번호가 변경되었습니다")
                   props.history.push("/login")
                 })

        // if (ChangePassword !== ConfirmPasword) {
           
        //     if (isPassword(ChangePassword)) {
        //          axios.post('http://localhost:4000/change_pw', param)
        //          .then((res) => {
        //            console.log(res)
        //          })
        //     }
        // }
        
    }

    function isPassword(asValue) {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; //  8 ~ 10자 영문, 숫자 조합
    if (!regExp.test(asValue)) {
      alert("비밀번호 형식에 맞지 않습니다")
    }
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
  }
    return (
        <div style={{
            display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",      
        height: "100vh",
        }}>
        
            <form onSubmit={onSubmitHandler}
                  style={{ display: "flex", flexDirection: "column" }}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>현재 비밀번호</label>
        <input type="text" id="pass" value={Password} onChange={onPasswordHandler} />
        <label>변경 비밀번호</label>
       <input type="text" id="chang_id" value={ChangePassword} onChange={onChangePasswordHandler} />
       <label>변경 비밀번호 확인</label>
       <input type="text" value={ConfirmPasword} onChange={onConfirmPasswordHandler} />
        <br/>
        <button type="submit" >비밀번호 변경</button>        
            </form>
         
           
        </div>
    )
}

export default withRouter(ChangePasswordPage);