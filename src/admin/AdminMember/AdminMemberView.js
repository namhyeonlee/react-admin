    import React, { useState, useParams, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from 'axios';

function AdminMemberView({ match }, props) {
    

    const { no } = match.params;
    const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");
  const [Gender, setGender] = useState("");
    const [Tel, setTel] = useState("");
    const [idx, setIdx] = useState('');
    


  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

     const onAgeHandler = (e) => {
    const target = e.currentTarget.value;
    const modifiedValue = target.substring(0, 5);
    setAge(modifiedValue);
  };
    const onGenderHandler = (e) => {
      setGender(e.target.value)
    };
  const onTelHandler = (e) => {
    const target = e.currentTarget.value;
    const modifiedValue = target.substring(0, 13);
    setTel(modifiedValue)
    
  };

    
    

    useEffect(async () => {
        // setUser(sessionStorage.getItem('email'))
 
        await axios.get('http://localhost:4000/memberView',{
            params: {
                'idx': no
            }
        })
            .then((res) => {
           
            setEmail(res.data[0].email)
            setPassword(res.data[0].password)
            setName(res.data[0].name)
            setAge(res.data[0].age)
            setGender(res.data[0].gender)
                setTel(res.data[0].tel)
            setIdx(res.data[0].idx)
        })
    },[])
   
    const onRemoveHandler = async (e) => {
       
        if (window.confirm("정말 삭제하시겠습니까?")) {
             await axios.get('http://localhost:4000/memberDelete', {
            params: {
                    'idx': idx
            }
        })
            .then((res) => {
                console.log('delete :: result :: ', res)
                alert("삭제되었습니다")
                document.location.href='/adminMemberPage'
        })
            
        }
       
    }
    const onSubmitHandler = async(e) => {
        e.preventDefault();
        const param = new URLSearchParams;
        param.append("name", Name);
        param.append("age", Age);
        param.append("tel", Tel);
        param.append("idx", idx);
        
        window.confirm("수정하시겠습니까?")
        await axios.post('http://localhost:4000/memberupdate', param)
        .then((res) => {
            console.log(res)
            alert("수정완료되었습니다")
            document.location.href='/AdminMemberPage'
        })

    }
 

    return (
        <div style={{
            width: "100%",
            height: "100vh",
            margin: "auto"
        }}> 
           
            <h1>상세페이지</h1>
            <form
                style={{ display: "flex", flexDirection: "column", width: "50%" }}
                onSubmit={onSubmitHandler}
            >
                <label>email</label>
                <input type="email" value={Email} />
                <label>password</label>
                <input type="password" value={Password} />
                <label>name</label>
                <input type="text" value={Name} />
                <label>age</label>
                <input type="number" value={Age} onChange={onAgeHandler} />
                <label>gender</label>
                <input type="text" value={Gender} onChange={onGenderHandler} />
                <label>tel</label>
                <input type="number" value={Tel} onChange={onTelHandler} />
                <button type="submit" style={{ width: "130px", marginTop:"10px" }}>수정하기</button>
            </form>

            <div>
                
                <button onClick={onRemoveHandler} style={{width:"130px", marginTop:"10px"}}>삭제하기</button>
                <button style={{width:"130px", marginTop:"10px", display:"block"}}><Link to="/adminMemberPage">목록</Link></button>
            </div>
            
            {/* {user === writer ? (
                <div style={{marginTop:"20px"}}> 
                    <button style={{ marginRight:"10px"}}>
                <Link to={`/boardUpdate/${idx}`}>수정하기</Link>
                </button>
                    <button onClick={onRemoveHandler} style={{ marginRight:"10px"}}>삭제하기</button>
                    <button><Link to="/">목록</Link></button>
                </div>
            ) :
                <button style={{marginTop:"20px"}}><Link to="/" >목록</Link></button>
                } */}
              
            
        </div>
        
    )
}

export default withRouter(AdminMemberView);
