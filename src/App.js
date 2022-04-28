import React, { useState }  from 'react';
import Table from './components/Table'
import './App.css';
import data from './data'
const { routes, getAirlineById, getAirportByCode } = data

const App = () => {
  const [ perPage, setPerPage ] = useState(25)

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

  const setRowsPerPage = (event) => {
    setPerPage(Number(event.target.value))
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
    <label>
      Rows Per Page:
      <select value={perPage} onChange={setRowsPerPage}>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        {/* <option value="all">All</option> */}
      </select>
    </label>
    <Table className="routes-table" columns={columns} rows={routes} format={formatValue} rowsPerPage={perPage}/>
  </div>
  )
}

export default App;