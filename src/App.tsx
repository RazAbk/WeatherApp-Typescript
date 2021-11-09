import React from 'react'
import { HashRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import { Favorites } from './pages/Favorites';
import { WeatherApp } from './pages/WeatherApp';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path = '/favorites' component={Favorites}/>
        <Route path = '/city/:citykey' component={WeatherApp}/>
        <Route exact path = '/' component={WeatherApp}/>
      </Switch>
    </HashRouter>
  );
}

export default App;
