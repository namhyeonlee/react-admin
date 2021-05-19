import React, { useState, useEffect}from "react";
import { withRouter, Link } from "react-router-dom";
import axios from 'axios'

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
        </div>
        
    )
}

export default withRouter(AdminMemberPage);