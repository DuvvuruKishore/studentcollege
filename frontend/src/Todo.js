import React from 'react';
import './Todo.css';
import Card from '@material-ui/core/Card';

function Todo({todo}) {
    return (
        <Card>
        {todo.map((t)=>(
            <div key={t.id}>
          <p>{t.college}</p>
          <p>{t.department}</p>
          <p>{t.gpa}</p>
          </div>
          
          ))}  
          </Card>
    )
}

export default Todo
