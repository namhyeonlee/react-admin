import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios';

function BoardUpdatePage() {
    const today = new Date().toISOString().substr(0, 10).replace('T', '');
    const [Title, setTitle] = useState("");
    const [Writer, setWriter] = useState('');
    const [Content, setContent] = useState('');

    console.log(today)

    //idx값 받아오기

    const onTitleHandler = (e) => {
        setTitle(e.currentTarget.value)
    }
    const onWriterHandler = (e) => {
        setWriter(e.currentTarget.value)
    }
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
            console.log(res)
        })
    }


    return (
        <div
        style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
        >
            <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={onSubmitHandler}
            >
                <label>title</label>
                <input value={Title} onChange={onTitleHandler}/>
                <label>writer</label>
                <input value={Writer} onChange={onWriterHandler}/>
                <label>content</label>
                <textarea value={Content} onChange={onContentHandler}/>
                <button type="submit" style={{margin:"100px"}}>등록</button>
            </form>
            
        </div>
    )
}

export default withRouter(BoardUpdatePage);
