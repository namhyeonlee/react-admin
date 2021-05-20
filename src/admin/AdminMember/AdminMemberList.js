import React, { useState, useEffect}from "react";
import { withRouter, Link } from "react-router-dom";


function AdminMemberList(props) {
    const InitData = props.InitData;
    return (
        <table>
                <thead>
                
                <th>index</th>
                <th>email</th>
                <th>name</th>
                <th>age</th>
                    <th>gender</th>
                    <th>tel</th>
                </thead>
                <tbody>
                   
                    {InitData.map((rowData, i) => (
                         
                        <tr key={i}>
                          
                         <td>
                                <Link to={`/memberView/${rowData.idx}`}>
                                    {rowData.order}
                                </Link>
                                
                        </td>
                       
                        <td>{rowData.email}</td>
                        <td>{rowData.name}</td>
                         <td>{rowData.age}</td> 
                        <td>{rowData.gender}</td>
                        <td>{rowData.tel}</td>
                        </tr>
                ))}
                   
                </tbody>
                
            </table>
    )
}

export default withRouter(AdminMemberList);