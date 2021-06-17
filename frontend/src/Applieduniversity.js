import React, { useState,useEffect } from 'react'
import axios from './axios';
import Card from '@material-ui/core/Card';
import './Applieduniversity.css'
import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom';


function Applieduniversity() {
  const [university,setUniversity]=useState([]);
    useEffect(()=>{
        axios.get('/api/college').then(response=>{
          setUniversity(response.data);
          console.log(response.data)
    
        })
        
      },[]);
     

    return (
        <div className="applied__university">
          <h1 className="university__header">universities</h1>  
        {university.map((data)=>(
              <Card key={data._id} className="card__value">
              <p>applied for {data.college} for department of {data.department}</p>
    
              
              </Card>
          ))}
          <div className="back__tostart">
          <Link to="/" style={{ textDecoration: 'none' }}>
         <Button variant="contained"  color="primary">
   Back to Start
 </Button>
 </Link>
 </div>
         </div>
    )
}

export default Applieduniversity
