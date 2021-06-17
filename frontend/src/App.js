import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import College from './College';
import Student from './Student.js';
import Applieduniversity from './Applieduniversity';

function App() {
  return (
    <div className="app">
<BrowserRouter>
<Switch>

<Route path="/" exact component={Student}/>
 <Route path="/Colleges" exact component={College}/>
 <Route path="/AppliedUniversity" exact component={Applieduniversity}/>
 
 </Switch>
</BrowserRouter>

    </div>
  );
}

export default App;
