import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from 'axios'

function BoardMainPage(props) {
    const InitData = props.InitData

    // const [InitData, setInitData] = useState([{
    //     inputData: {
    //         idx: '',
    //         title: '',
    //         content: '',
    //         writer: '',
    //         write_date:''
    //     }
    // }])
    // //원할한 데이터 관리를 위해 글 갯수를 파악한다
    // const [InitLastIdx, setInitLastIdx] = useState(0)
    
    // useEffect(async (e) => {
        
    //     axios.get('http://localhost:4000/boardlist')
    //         .then((res) => {
    //             console.log(res)
    //             const _inputData = res.data.map((rowData) => (
    //                 setInitLastIdx(rowData.idx),
    //                 {
    //                 idx: rowData.idx,
    //                 title: rowData.title,
    //                 content: rowData.content,
    //                 writer: rowData.writer,
    //                 write_date: rowData.write_date
    //                 }
                    
    //             ))
    //             console.log(_inputData)
    //             setInitData(InitData.concat(_inputData))
    //     })

    // }, [])


   
    return (
        <div>
            <h2>게시판</h2>
            <table>
                <thead>
                
                <th>index</th>
                <th>title</th>
                <th>content</th>
                <th>writer</th>
                <th>date</th>
                </thead>
                <tbody>
                    {InitData.map((rowData, i) => (
                         
                       <tr>
                         <td>
                            <Link to={`/postView/${rowData.idx}`}>{i+1}</Link>
                        </td>
                       
                        <td>{rowData.title}</td>
                        <td>{rowData.content}</td>
                         <td>{rowData.writer}</td> 
                          <td>{rowData.write_date}</td>
                        
                        </tr>
                ))}
                   
                </tbody>
                
            </table>
            {sessionStorage.getItem('email')?<button style={{marginTop:"10px"}}><Link to="/boardInsert">글쓰기</Link></button>:null}
            
        </div>
    )
}

export default withRouter(BoardMainPage);
