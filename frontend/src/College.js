import React,{useState,useEffect} from 'react';
import './College.css';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from './axios';
import Card from '@material-ui/core/Card';
import { Button } from '@material-ui/core';
import Todo from './Todo';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';



function College() {
    const [college,setCollege]=useState('college');
    const [department,setDepartment]=useState('department');
    const [higher,setHigher]=useState([]);
    const [gpa,setGpa]=useState('');
    const [todo,setTodo]=useState([]);
    const [mail,setMail]=useState('');

    useEffect(()=>{
        axios.get('/get/college').then(response=>{
         setHigher(response.data);

          console.log(response.data);
        
        })
      },[]);

    const CollegeChange=(e)=>{
    let value=e.target.value;
    setCollege(value);
      }

      const DepartmentChange=(e)=>{
        let value=e.target.value;
        setDepartment(value);
          }
          
/*const addTodo=(e)=>{
            e.preventDefault();
            
            const taskDetails={
              id:Math.floor(Math.random() * 1000),
              college:college,
              department:department,
              gpa:gpa
            }
            setTodo([...todo,taskDetails]);
            console.log(todo);
        }*/

        const addTodo=(e)=>{
            e.preventDefault();
            
            let taskDetails={
              college:college,
              department:department,
              gpa:gpa,
              mail:mail,
            }
            axios.post('api/sendmail',taskDetails);
          
        }

        const reset=(e)=>{
          e.preventDefault();
        setCollege('college');
        setDepartment('department');
        setGpa('');
        setMail('');
          /*let taskDetails={
            college:college,
            department:department,
            gpa:gpa,
            mail:mail,
          }*/
          
        
      }


    return (
    
        <div className="college">
        <div className="college__header">
         <h2>applying to higher studies</h2>
         <div className="applied__button">
         <Link to="/AppliedUniversity" style={{ textDecoration: 'none' }}>
         <Button variant="contained"  color="primary">
   Applied university
 </Button>
 </Link>
 </div>
         </div>
         <Card className="form__card">
         <form onClick={addTodo}>
         <div className="college__name">
        <label>College Name</label>  
        <Select  labelId="demo-simple-select-filled-label"
      id="demo-simple-select-filled" className="select" onChange={CollegeChange} value={college}>
      <MenuItem value="college">college</MenuItem>
    {higher.map((data)=>(
        <MenuItem value={data.college}>{data.college}</MenuItem>
    ))}
  </Select>

      </div>
      <div className="college__department">
      
      <label>department</label>
    
      
      <Select  labelId="demo-simple-select-filled-label"
      id="demo-simple-select-filled" className="select" onChange={DepartmentChange} value={department}>
      <MenuItem value="department">department</MenuItem>
    {higher.map((data)=>(
        <MenuItem value={data.collegedepartment}>{data.collegedepartment}</MenuItem>
    ))}

  </Select>
  </div>

  <div className="gpa">
  
  <label>GPA</label>
  
  
  <TextField id="standard-basic" placeholder="gpa" type="text" value={gpa} className="gpa" onChange={(e)=>setGpa(e.target.value)} />
     
  
  {/*<input type="text" value={gpa} className="gpa" onChange={(e)=>setGpa(e.target.value)}></input>*/}
  </div>
  <div className="gmail">
  <label>Gmail</label>
  </div>
  <div className="submit">
  <TextField id="outlined-basic" placeholder="gmail" variant="outlined" 
  type="email" value={mail} onChange={(e)=>setMail(e.target.value)}/>
  
  <div className="formSubmit">
  <Button onClick={(e)=>{addTodo(e)}} variant="contained" className="higher__button" color="primary">
  submit
</Button>


<Button onClick={(e)=>{reset(e)}} variant="contained" className="higher__button" color="primary">
Reset
</Button>
</div>
</div>

  </form>
  </Card>
  <p className="emailsent">email will be sent once you submit the form</p>
  {/*{todo.map((t)=>(
    <div key={t.id}>
  <p>{t.college}</p>
  <p>{t.department}</p>
  <p>{t.gpa}</p>
  </div>
  
  ))}
 
  <Todo todo={todo}></Todo>*/}
    
    </div>
    )}
  

export default College
