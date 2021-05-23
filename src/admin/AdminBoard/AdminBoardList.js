import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from 'axios'

function AdminBoardList(props) {
    const InitData = props.InitData;
  
    return (
        <div>
            <table style={{margin:"auto"}}>
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
                                <Link to={`/adminBoardView/${rowData.idx}`} style={{ textDecoration: 'none',color:"black"}}>
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
            
            
        </div>
    )
}

export default withRouter(AdminBoardList);
