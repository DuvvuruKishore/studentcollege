import React, { useState,useEffect } from 'react'
import axios from './axios';
import Card from '@material-ui/core/Card';
import './Applieduniversity.css'
import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom';
import Pusher from 'pusher-js';


function Applieduniversity() {
  const [university,setUniversity]=useState([]);
    useEffect(()=>{
        axios.get('/api/college').then(response=>{
          setUniversity(response.data);
        
    
        })
        
      },[]);
    
      useEffect(()=>{
        var pusher = new Pusher('9380f96f344ea8a3e0d7', {
          cluster: 'ap2'
        });
    
        var channel = pusher.subscribe("messages");
        channel.bind('inserted', function(data) {
          //alert(JSON.stringify(data));
          setUniversity([...university,data])
        });
    
       return ()=>{
          channel.unbind_all();
          channel.unsubscribe();
        }
      
      },[university])
    
console.log(university);
    return (
        <div className="applied__university">
          <h1 className="university__header">universities</h1>  
        {university.map((data)=>(
          <div className="card__value">
              <Card key={data._id} >
              <p>applied for {data.college} for department of {data.department}</p>
    
              
              </Card>
              </div>
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
