import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from 'axios'

function BoardMainPage(props) {
    const InitData = props.InitData;
  

   
    return (
        <div className="board">
           
            <h2>게시판</h2>
            <table>
                <thead className="thead"> 
                
                <th>index</th>
                <th>title</th>
                <th>content</th>
                <th>writer</th>
                <th>date</th>
                </thead>
                <tbody>
                   
                    {InitData.map((rowData, i) => (
                         
                        <tr key={i}>
                          
                         <td>
                                <Link to={`/postView/${rowData.idx}`}>
                                    {rowData.order}
                                </Link>
                                
                        </td>
                       
                        <td>{rowData.title}</td>
                        <td>{rowData.content}</td>
                         <td>{rowData.writer}</td> 
                          <td>{rowData.write_date}</td>
                        
                        </tr>
                ))}
                   
                </tbody>
                
            </table>
            {sessionStorage.getItem('email')?<button style={{marginTop:"10px", float:"right"}}><Link to="/boardInsert">글쓰기</Link></button>:null}
            
        </div>
    )
}

export default withRouter(BoardMainPage);
