import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Crud() {

    const [items,setItems] = useState([]);
    const [editid,setEditid] = useState(false);

    const [input,setInput] = useState({
        name : '',
        email : '',
        password : ''
    })

    const handleChange = (e) => {
        let name = e.target.name; 
        let value = e.target.value;

        setInput(
            {...input,[name] : value}
        )
    }

    const getAllrecord = () => {
        axios.get("http://localhost:3001/crud").then((res)=>{
            setItems(res.data);
        })
    }
    useEffect(()=>{
        getAllrecord();
    },[])
    
    const save = () => {
        const {name,email,password} = input;
        // const obj = {
        //     id : Math.floor(Math.random() * 10000),
        //     name : name,
        //     email : email,
        //     password : password
        // }
            if(editid){
                axios.put(`http://localhost:3001/crud/${editid}`, {
                    name : name,
                    email : email,
                    password : password
	            }).then((res)=>{
                    if(res){
                        alert("Reocrd successfully update");
                    }
                    getAllrecord();
                    setEditid(false);
                })
                setInput({
                    name : '',
                    email : '',
                    password : '',
                })
            }else{
                axios.post("http://localhost:3001/crud",{
                    name : name,
                    email : email,
                    password : password
                }).then((response)=>{
                    if(response){
                        console.log(response);
                        alert("Reocrd successfully add");
                        getAllrecord();   
                    }
                })
                setInput({
                    name : '',
                    email : '',
                    password : '',
                })
            }
    }
    const deletedata = (id) => {
        axios.delete(`http://localhost:3001/crud/${id}`).then((res)=>{
            if(res){
                alert("Record successfully delete");
            }
        })
    }
    const editdata = (id) => {
        axios.get(`http://localhost:3001/crud/${id}`).then((res)=>{
            setInput(res.data)
            setEditid(res.data.id);
        })
    }
  return (
        <center>
            <table border={1}>
                <tr>
                    <td>Name</td>
                    <td><input type='text' name='name' onChange={ (e) => handleChange(e) } value={input.name}/></td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td><input type='text' name='email' onChange={ (e) => handleChange(e) } value={input.email}/></td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td><input type='text' name='password' onChange={ (e) => handleChange(e) } value={input.password}/></td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                    {
                        editid ? <input type='button' onClick={ () => save() } value="Edit"/> : <input type='button' onClick={ () => save() } value="submit"/>
                    }
                    </td>
                </tr>
            </table><br></br><br></br>

            <table border={1}>
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Password</td> 
                        <td>Action</td> 
                    </tr>
                    
                    {
                        items.map((val)=>{
                            return (
                                <tr>
                                    <td>{val.id}</td>
                                    <td>{val.name}</td>
                                    <td>{val.email}</td>
                                    <td>{val.password}</td>
                                    <td>
                                        <button onClick={ () => deletedata(val.id) }>Delete</button> ||
                                        <button onClick={ () => editdata(val.id) }>Edit</button>

                                    </td>
                                </tr>
                            )
                        })
                    }
                        
            </table>

        </center>
  )
}

export default Crud