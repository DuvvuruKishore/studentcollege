import React,{useState,useEffect} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import './Student.css';
import axios from './axios';
import StudentTable from './StudentTable';
import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom';

function Student() {
    const [country,setCountry]=useState('college');
    const [messages,setMessages]=useState([]);
    const [college,setCollege]=useState([]);

    
  useEffect(()=>{
    axios.get('/students/college').then(response=>{
      setMessages(response.data);
      setCollege(response.data);

    })
    
  },[]);
  var flags = [], output = [], l = college.length, i;
    
  function distinct(){
    for( i=0; i<l; i++) {
        if( flags[college[i].college]) continue;
        flags[college[i].college] = true;
        output.push(college[i].college);
    }
  
  }
  distinct();

  
  const onCountryChange=async(e)=>{
   // let collegeName=e.target.value;
    let collegeName=e.target.value==="college"?"":e.target.value;
    axios.get(`/students/college/${collegeName}`).then(response=>{
        setCountry(collegeName);
      
      setMessages(response.data);
    
    })
     }
    

    return (
        <div className="student">
        <div className="select_college">
        <div className="student__heading">
            <h3>student list based on college</h3>
            </div>
            <div className="college__menu">
            <Select labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled" onChange={onCountryChange} value={country}>
          
          <MenuItem value="college">college</MenuItem>
          {output.map((data,index)=>(
          
            <MenuItem key={index} value={data}>{data}</MenuItem>
            
          ))}
        </Select>
        </div>
        <div className="apply__higher">
        <Link to="/Colleges" style={{ textDecoration: 'none' }}>
        <Button variant="contained"  color="primary">
  Apply for higher Studies
</Button>
</Link>
</div>
        </div>
        <div className="student__Info">
            <StudentTable studentInfo={messages}/>
            
        </div>
        </div>
    )
}

export default Student
