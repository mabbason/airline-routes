import React, { Component }  from 'react';
import Table from './components/Table'
import './App.css';
import data from './data'
const { routes, getAirlineById, getAirportByCode } = data

const App = () => {
  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ]

  const formatValue = (property, value) => {
    if (property === 'airline') {
      return getAirlineById(value)
    } else {
      return getAirportByCode(value)
    }
  }
  
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
    <Table className="routes-table" columns={columns} rows={routes} format={formatValue} />
    
  </div>
  )
}

export default App;