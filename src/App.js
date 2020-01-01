import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './pages/Header/Header';
import DetailCategory from './pages/DetailCategory/DetailCategory';
import Category from './pages/Catergory/Category';
import Event from './pages/Event/Event';
import UpCommingEvent  from './pages/UpCommingEvent/UpCommingEvent';
import EventsByTitle from './pages/EventsByTitle/EventsByTitle';
import DetailEvent from './pages/DetailEvent/DetailEvent';

class App extends Component{
  render(){
    return(
      <div>
      <Router>
        <Switch>
          <Route path="/detailEvent/:id">
            <Header/>
            <DetailEvent/>
          </Route>
          <Route path="/detailCategory/:id">
            <Header/>
            <DetailCategory/>
          </Route>
          <Route path="/eventbytitle/:title">
            <Header/>
            <Category />
            <EventsByTitle/>
          </Route>
          <Route path="/">
            <Header/>
            <Category />
            <Event/>
            <UpCommingEvent/>
          </Route>
        </Switch>
      </Router>
      </div>
    )
  }
}

export default App;
