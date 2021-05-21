import React, { useState, useEffect}from "react";
import { withRouter, Link } from "react-router-dom";
import BoardMainPage from "../../boardPage/BoardMainPage";
import axios from 'axios'
import Pagination from "../../boardPage/Pagination";



function LandingPage(props) {
  
  const isLogin = props.isLogin
  
  const onLogout = (e) => {
    e.preventDefault();
    	// sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다
    sessionStorage.removeItem('email')
     props.history.push("/login")
    
  }

  const [InitData, setInitData] = useState([{
    inputData: {
            order:'',
            idx: '',
            title: '',
            content: '',
            writer: '',
            write_date:''
        }
  }])


  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

    
    useEffect(async (e) => {
        
        axios.get('http://localhost:4000/boardlist')
            .then((res) => {
                console.log(res)
                const _inputData = res.data.map((rowData, i) => (
                   
                    {
                    order: i + 1,
                    idx:rowData.idx,
                    title: rowData.title,
                    content: rowData.content,
                    writer: rowData.writer,
                    write_date: rowData.write_date
                    }
                    
                ))
                console.log(_inputData)
                setInitData(InitData.concat(_inputData))
        })

    }, [])
  
   


  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }


  return (
    <div
      style={{
       
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}>
      <div style={{display:"flex", justifyContent:"space-between"}}>
        
      </div>
      <BoardMainPage isLogin={isLogin} InitData={currentPosts(InitData)}/>
      <Pagination className="pagination" postsPerPage={postsPerPage} totalPosts={InitData.length} paginate={setCurrentPage} />
  
    </div>
  );
}

export default withRouter(LandingPage);