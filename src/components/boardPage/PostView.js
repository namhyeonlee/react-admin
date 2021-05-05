    import React, { useState, useParams, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from 'axios';

function PostView({ match }, props) {
    

    const { no } = match.params;
    console.log(no)
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [writer, setWriter] = useState('');
    const [date, setDate] = useState('');
    const [idx, setIdx] = useState('');
 

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
            setDate(res.data[0].write_date)
            setIdx(res.data[0].idx)
        })
    })
   
    const onRemoveHandler = async (e) => {
        await axios.get('http://localhost:4000/boardDelete/', {
            params: {
                    'idx': idx
            }
        })
            .then((res) => {
                console.log('delete :: result :: ', res)
                alert("삭제되었습니다")
                document.location.href='/boardmain'
        })
    }

    return (
        <div>
            <h1>상세페이지</h1>
            <h3>title : {title} </h3>
            <p>content: {content}</p>
            <p>writer: { writer}</p>
            <button>
                <Link to={`/boardUpdate/${idx}`}>수정하기</Link>
            </button>
            <button onClick={onRemoveHandler}>삭제하기</button>
        </div>
        
    )
}

export default withRouter(PostView);