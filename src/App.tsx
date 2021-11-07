import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import { Favourites } from './pages/Favourites';
import { WeatherApp } from './pages/WeatherApp';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path = '/favorites' component={Favourites}/>
        <Route exact path = '/' component={WeatherApp}/>
      </Switch>
    </Router>
  );
}

export default App;
