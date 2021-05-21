    import React, { useState, useParams, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from 'axios';

function AdminBoardView({ match }, props) {
    

    const { no } = match.params;
   const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [writer, setWriter] = useState('');
    const [date, setDate] = useState('');
    const [idx, setIdx] = useState('');
   const today = new Date().toISOString().substr(0, 10).replace('T', '');
    


  const onContentHandler = (e) => {
    setContent(e.currentTarget.value);
  };
    const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };

  

    
    

    useEffect(async () => {
 
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
    },[])
   
    const onRemoveHandler = async (e) => {
       
        if (window.confirm("정말 삭제하시겠습니까?")) {
             await axios.get('http://localhost:4000/boardDelete', {
            params: {
                    'idx': idx
            }
        })
            .then((res) => {
                console.log('delete :: result :: ', res)
                alert("삭제되었습니다")
                document.location.href='/adminBoardPage'
        })
            
        }
       
    }
    const onSubmitHandler = async(e) => {
        e.preventDefault();
        const param = new URLSearchParams;
        param.append("title", title);
        param.append("content", content);
        param.append("idx", idx);
        param.append('write_date', today);
        
        window.confirm("수정하시겠습니까?")
        await axios.post('http://localhost:4000/boardupdate', param)
        .then((res) => {
            console.log(res)
            alert("수정완료되었습니다")
            document.location.href='/adminBoardPage'
        })

    }
 

    return (
        <div style={{
            width: "100%",
            height: "100vh",
            margin: "auto"
        }}> 
           
            <h1>상세페이지</h1>
            {sessionStorage.getItem('email') ? (
                <>
                 <form
                style={{ display: "flex", flexDirection: "column", width: "50%" }}
                onSubmit={onSubmitHandler}
            >
                 <form style={{ display: "flex", flexDirection: "column", width: "50%" }}>
                <label>title</label>
                    <input type="text" value={title} onChange={onTitleHandler}/>
                <label>content</label>
                <textarea type="text" value={content} onChange={onContentHandler} />
                <label>writer</label>
                <input type="text" value={writer}/>
            </form>
                <button type="submit" style={{ width: "130px", marginTop:"10px" }}>수정하기</button>
            </form>

            <div>
                
                <button onClick={onRemoveHandler} style={{width:"130px", marginTop:"10px"}}>삭제하기</button>
                <button style={{width:"130px", marginTop:"10px", display:"block"}}><Link to="/adminBoardPage">목록</Link></button>
                    </div>
                    </>
            ): null}
           
           
              
            
        </div>
        
    )
}

export default withRouter(AdminBoardView);
