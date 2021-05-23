import React, { useState, useEffect}from "react";
import { withRouter, Link } from "react-router-dom";
import axios from 'axios';
import AdminBoardList from "./AdminBoardList";
import Pagination from '../../components/boardPage/Pagination';
import AdminNav from '../AdminLandingPage/AdminNav';

function AdminBoardPage() {

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
    

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

    
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


    return (
        <div>
            <AdminNav/>
            <h2 style={{textAlign:"center"}}>AdminBoardPage</h2>
            <AdminBoardList InitData={currentPosts(InitData)} />
            <Pagination postsPerPage={postsPerPage} totalPosts={InitData.length} paginate={setCurrentPage}/>
            </div>
       
    )
}

export default withRouter(AdminBoardPage);