import React, { useState, useEffect}from "react";
import { withRouter, Link } from "react-router-dom";
import axios from 'axios'
import AdminMemberList from "./AdminMemberList";
import Pagination from '../../components/boardPage/Pagination';

function AdminMemberPage(props) {
     const [InitData, setInitData] = useState([{
         inputData: {
            order:'',
            idx: '',
            email: '',
            name: '',
            age: '',
             gender: '',
            tel:''
        }
     }])
    
  const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
      const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

    useEffect(async (e) => {
        
        axios.get('http://localhost:4000/memberlist')
            .then((res) => {
                console.log(res)
                const _inputData = res.data.map((rowData, i) => (
                   
                    {
                    order: i+1,
                    idx:rowData.idx,
                    email: rowData.email,
                    name: rowData.name,
                    age: rowData.age,
                    gender: rowData.gender,
                    tel:rowData.tel
                    }
                    
                ))
                console.log(_inputData)
                setInitData(InitData.concat(_inputData))
        })

    }, [])

    return (
        <div>
            <h2>memberlist</h2>
            <button><Link to="/adminBoardPage">게시판관리</Link></button>
            <AdminMemberList InitData={currentPosts(InitData)} />
            <Pagination postsPerPage={postsPerPage} totalPosts={InitData.length} paginate={setCurrentPage}/>
        </div>
        
    )
}

export default withRouter(AdminMemberPage);