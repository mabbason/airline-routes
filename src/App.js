import React, { Component } from 'react';
import './App.css';
import data from './data'
const { routes, getAirlineById, getAirportByCode } = data

const App = () => {
  
  return (
  <div className="app">
    <header className="header">
      <h1 className="title">Airline Routes</h1>
    </header>
    <section>
      <p>
        Welcome to the app!
      </p>
    </section>
    <table>
      <tr>
        <td>Airline</td>
        <td>Source</td>
        <td>Destination</td>
      </tr>
      {routes.map(r => <tr>
          <td>{getAirlineById(r.airline)}</td>
          <td>{getAirportByCode(r.src)}</td>
          <td>{getAirportByCode(r.dest)}</td>
        </tr>)
       }
    </table>
    
  </div>
  )
}

export default App;