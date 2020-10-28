import React from 'react'
import logo from './logo.svg'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import NewEmail from './components/NewEmail'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/new-email">
          <NewEmail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
