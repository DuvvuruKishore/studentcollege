import React from 'react'
import './StudentTable.css';

function StudentTable({studentInfo}) {
    return (
        <div className="table">
        <h2><strong>Students list</strong></h2>
        
           {studentInfo.map(({student,rollno,_id,college})=>(
               <table key={_id}>
               <tbody>
              <tr key={_id}>
                  <td>{student}</td>
                  <td>{rollno}</td>
                  <td>{college}</td>
              </tr> 
              </tbody>
              </table>
              ))}
              
        </div>

    )
}

export default StudentTable
