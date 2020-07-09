import React from 'react';
import Nav from './Components/Nav'
import User from './Components/User'
import Home from './Components/Home'
import Profile from './Components/Profile'
import addShow from './Components/addShow'
import './App.css';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(){
      super()
      this.state = {
          users: [],
          loggedInUser:1
      }
  }

  render(){
      const {loggedInUser} = this.state

  return (
  <div className="App">
      
      <Nav />

      <Switch>
      <Route exact path ="/" component={Home} /> 
      <Route exact path="/users" component={User}  loggedInUser={loggedInUser}/>
      <Route exact path="/users/:id" component={Profile} loggedInUser={loggedInUser}/>
       <Route exact path="/addShow" component={addShow} loggedInUser={loggedInUser}/>

     </Switch>

    </div>
  )
}
}

export default App;
