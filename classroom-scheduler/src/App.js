import React, { Component } from 'react';
import Header from './Components/Header';
import Content from './Components/Content';
import Footer from './Components/Footer';
import './Components/Components.css';
import './App.css';
import Login from './Components/Login';
import Teachers from './Components/Teachers';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';


export default class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Header/>
        <Switch>
          
          <Route exact path="/">
            <Teachers/>
          </Route>

          <Route exact path="/calender">
            <Content/>
          </Route>

          <Route exact path="/login">
            <Login/>
          </Route>

        </Switch>
        <Footer/>
      </div>
      </Router>
    )
  }
}

