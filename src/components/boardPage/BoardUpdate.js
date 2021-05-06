import React, { useState, useParams, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from 'axios';

function Boardupdate({ match }) {
    

    const {no} = match.params;
  
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [writer, setWriter] = useState('')
    const today = new Date().toISOString().substr(0, 10).replace('T', '');
    console.log(today)
 
    const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
    };
    const onContentHandler = (e) => {
        setContent(e.currentTarget.value);
    }
    useEffect(async () => {
        
        await axios.get('http://localhost:4000/postView',{
            params: {
                'idx': no
            }
        })
            .then((res) => {
            console.log(res)
            setTitle(res.data[0].title)
            setContent(res.data[0].content)  
            setWriter(res.data[0].writer)
        })
    },[])
   
    const onSubmitHandler = async(e) => {
        e.preventDefault();
        const param = new URLSearchParams;
        param.append("title", title);
        param.append("content", content);
        param.append("idx", no);
        param.append('write_date', today);
        
        await axios.post('http://localhost:4000/boardupdate/', param)
        .then((res) => {
            console.log(res)
            alert("수정완료되었습니다")
            document.location.href='/'
        })

    }
 

    return (
        <div style={{

        width: "100%",
        height: "100vh",
      }}>
            <h1>수정하기</h1>
            <form
                onSubmit={onSubmitHandler}
                style={{ display: "flex", flexDirection: "column", width: "50%" }}>
                <label>title</label>
                <input type="text" value={ title} onChange={onTitleHandler}/>
            <label>content</label>
                <textarea type="text" value={content} onChange={ onContentHandler}/>
            <p>writer: { writer}</p>
            <button type="submit">
               수정하기
            </button>   
            </form>
            <button>
                <Link to="/boardmain">목록으로 돌아가기</Link>
            </button>
        </div>
        
    )
}

export default withRouter(Boardupdate);
