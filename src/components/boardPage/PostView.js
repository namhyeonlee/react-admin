    import React, { useState, useParams, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from 'axios';

function PostView({ match }, props) {
    

    const { no } = match.params;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [writer, setWriter] = useState('');
    const [date, setDate] = useState('');
    const [idx, setIdx] = useState('');
    const [user, setUser] = useState('');
    
    

    useEffect(async () => {
        setUser(sessionStorage.getItem('email'))
 
        await axios.get('http://localhost:4000/postView',{
            params: {
                'idx': no
            }
        })
            .then((res) => {
           
            setTitle(res.data[0].title)
            setContent(res.data[0].content)
            setWriter(res.data[0].writer)
            setDate(res.data[0].write_date)
            setIdx(res.data[0].idx)
        })
    })
   
    const onRemoveHandler = async (e) => {
       
        if (window.confirm("정말 삭제하시겠습니까?")) {
             await axios.get('http://localhost:4000/boardDelete/', {
            params: {
                    'idx': idx
            }
        })
            .then((res) => {
                console.log('delete :: result :: ', res)
                alert("삭제되었습니다")
                document.location.href='/'
        })
            
        }
       
    }

    return (
        <div style={{
            width: "100%",
            height: "100vh",
            
        }}> 
           
            <h1 style={{textAlign:"center"}}>상세페이지</h1>
            <form style={{ display: "flex", flexDirection: "column", width: "50%", margin: "auto"}}>
                <label>title</label>
                <input type="text" value={title} />
                <label>content</label>
                <textarea type="text" value={content} />
                <label>writer</label>
                <input type="text" value={writer}/>
            </form>
            
            {user === writer ? (
                <div style={{marginTop:"20px",  textAlign:"center"}}> 
                    <button style={{ marginRight:"10px"}}>
                <Link to={`/boardUpdate/${idx}`}>수정하기</Link>
                </button>
                    <button onClick={onRemoveHandler} style={{ marginRight:"10px"}}>삭제하기</button>
                    <button><Link to="/">목록</Link></button>
                </div>
            ) :
                <button style={{marginTop:"20px"}}><Link to="/" >목록</Link></button>
                }
              
            
        </div>
        
    )
}

export default withRouter(PostView);
