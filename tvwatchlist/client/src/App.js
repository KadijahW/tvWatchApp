import React from 'react';
import Nav from './Components/Nav'
import User from './Components/User'
import Home from './Components/Home'
import Profile from './Components/Profile'
import addShow from './Components/addShow'
import Shows from './Components/Shows'
import './App.css';
import { Switch, Route } from 'react-router-dom';
import ShowsProfile from './Components/ShowsProfile';

class App extends React.Component {
  constructor(){
      super()
      this.state = {
          users: [],
          user_id: 4
      }
  }

  render(){
      const {user_id} = this.state

  return (
  <div className="App">
      
      <Nav />

      <Switch>
      <Route exact path ="/" component={Home} /> 
      <Route exact path="/users" component={User}  user_id={user_id}/>
      <Route exact path="/users/:userId" component={Profile} />
      <Route exact path="/addShow" component={addShow} />
      <Route exact path="/shows" component={Shows} />
      <Route exact path='/shows/:show_id' component={ShowsProfile}  />
     </Switch>

    </div>
  )
}
}

export default App;
