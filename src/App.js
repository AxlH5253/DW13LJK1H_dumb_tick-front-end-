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
import Register from './components/Register';
import AddEvent from './pages/AddEvent/AddEvent';
import MyTicket from './pages/MyTicket/MyTicket';
import Payment from './pages/Payment/Payment';
import Profile from './pages/Profile/Profile';
import EditProfile from './components/EditProfile';

class App extends Component{
  render(){
    return(
      <div>
      <Router>
        <Switch>
          <Route path="/editprofile">
            <Header/>
            <EditProfile/>
          </Route>
          <Route path="/profile">
            <Header/>
            <Profile/>
          </Route>
          <Route path="/payment">
            <Header/>
            <Payment/>
          </Route>
          <Route path="/myticket">
            <Header/>
            <MyTicket/>
          </Route>
          <Route path="/addevent">
            <Header/>
            <AddEvent/>
          </Route>
          <Route path="/register">
            <Header/>
            <Register/>
          </Route>
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
