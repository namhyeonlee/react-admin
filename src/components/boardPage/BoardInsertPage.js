import React, { useEffect, useState } from "react";
import { withRouter, Link} from "react-router-dom";
import axios from 'axios';
import { json } from "body-parser";

function BoardInsertPage(props) {
    const today = new Date().toISOString().substr(0, 10).replace('T', '');
    const [Title, setTitle] = useState("");
    const [Writer, setWriter] = useState('');
    const [Content, setContent] = useState('');
    const [Lastidx, setLastidx] = useState('');
   


    useEffect(() => {
        setWriter(sessionStorage.getItem('email'))
        
    }, [])
    

  

    const onTitleHandler = (e) => {
        setTitle(e.currentTarget.value)
    }
    // const onWriterHandler = (e) => {
    //     setWriter(e.currentTarget.value)
    // }
    const onContentHandler = (e) => {
        setContent(e.currentTarget.value)
    }

    const onSubmitHandler = async(e) => {
        e.preventDefault();

         const param = new URLSearchParams;
            param.append("title", Title);
            param.append("content", Content);
            param.append("writer", Writer);
            param.append("write_date", today)
        
        axios.post('http://localhost:4000/boardinsert', param)
            .then((res) => {
                alert("글이 등록되었습니다")
                props.history.push("/")
                
        })
    }


    return (
        <div
        style={{
                display: "flex",
                flexDirection: "column" ,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
      }}
        >
            <form
                style={{ display: "flex", flexDirection: "column", }}
                onSubmit={onSubmitHandler}
            >
                <label>title</label>
                <input value={Title} onChange={onTitleHandler}/>
                <label>writer</label>
                <input value={Writer}/>
                <label>content</label>
                <textarea value={Content} onChange={onContentHandler}/>
                <button type="submit" style={{ marginTop: "50px", width: "130px" }}>등록</button>
                <button type="button" style={{marginTop: "10px", width:"130px"}}><Link to="/">목록</Link></button>
            </form>
            
            
         
        </div>
    )
}

export default withRouter(BoardInsertPage);
