import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios'


function FindPasswordPage(props) {
    
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [FindPassword, setFindPassword] = useState([]);
    const [text, setText] = useState(false);
    

    const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };
    const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
    };

     const onChangepasswordHandler = (e) => {
     e.preventDefault();
    props.history.push("/changepass")
  }
    
    const onSubmitHandler = (e) => {
        e.preventDefault();

        const param = new URLSearchParams;
        param.append("name", Name);
        param.append("email", Email)
        
        axios.post('http://localhost:4000/pass', param)
            .then((res) => {    
                console.log(res);
                if (res.data === "") {
                    alert("없는 정보입니다");
                } else {
                    console.log(res.data)
                    setFindPassword(res.data.password)

                    console.log(FindPassword)
                    setText(true)
                }
            
        })

    }

    const decryptePassword = (encryption) => {
        axios.post('http://localhost:4000/pass', {
            password: encryption.password,
            iv: encryption.iv
        })
   }

    return (
        <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",  
        height: "100vh",
        }}>
            <form onSubmit={onSubmitHandler}
                style={{ display: "flex", flexDirection: "column" }}
            >
        <h2>비밀번호 찾기</h2>
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <label>email</label>
       <input type="email" value={Email} onChange={onEmailHandler} />
        <br/>
                <button type="submit" >비밀번호 찾기</button>
        <button onClick={onChangepasswordHandler} style={{marginTop:"10px"}}>비밀번호 변경</button>            
            </form>
            <br />
            {text ? <div>
                <h3>비밀번호: {FindPassword}</h3>   
            </div> : null}
            <br />
           
        </div>
    )
}

export default withRouter(FindPasswordPage);