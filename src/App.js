import React, { useState, useEffect } from 'react';
import { Switch, Route,Router,Routes } from 'react-router-dom';
import './App.css';
import Dropdown from './components/Dropdown';
import Navbar from './components/Navbar';
import TodoBoxing from './pages/todo';
import TimerBoxing from './pages/timebox';
import Profile from './pages/profile';
import Statistic from './pages/statistic';
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home"
import TimeboxingDemo from './pages/timebox-demo'
import TimeCountTest from './pages/timecounttest'

import Axios from "axios";
function App() {

  

  return (
    <>
  
      <Navbar />
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/" exact component={Home} />
        <Route path="/todo-boxing" exact component={TodoBoxing} />
        <Route path="/timer-boxing" exact component={TimerBoxing} />
        <Route path="/statistic" exact component={Statistic} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/timer-boxing-demo" exact component={TimeboxingDemo} />
        <Route path="/timercounttest" exact component={TimeCountTest} />
      </Switch>
    </>
  );
}

export default App;
