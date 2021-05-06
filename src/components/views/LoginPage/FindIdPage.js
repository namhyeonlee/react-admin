import React, { useState } from "react";
import { withRouter,Link } from "react-router-dom";
import axios from 'axios'


function FindIdPage() {
    const [Name, setName] = useState("");
    const [Tel, setTel] = useState("");
    const [FindId, setFindId] = useState("");
    const [text, setText] = useState(false);

    const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };
    const onTelHandler = (e) => {
    setTel(e.currentTarget.value);
    };
    
    const onSubmitHandler = (e) => {
        e.preventDefault();

        const param = new URLSearchParams;
        param.append("name", Name)
        param.append("tel", Tel)
        axios.post('http://localhost:4000/id', param)
            .then((res) => {    
                console.log(res)
                if (res.data === "") {
                    alert("없는 전화번호입니다")
                } else {
                    setFindId(res.data.email)
                    setText(true)
                }
            
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
        <form onSubmit={onSubmitHandler}>
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <label>tel</label>
       <input type="number" value={Tel} onChange={onTelHandler} />
        <br/>
        <button type="submit" >아이디 찾기</button>        
            </form>
            <br />
            {text ? (<div>
                <h1>아이디:{FindId}</h1>
                <button><Link to="/login">로그인하기</Link></button>
            </div>) : null}
           
        </div>
    )
}

export default withRouter(FindIdPage);