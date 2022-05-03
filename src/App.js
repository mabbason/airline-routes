import React, { useState, useEffect }  from 'react';
import Table from './components/Table'
import Select from './components/Select';
import './App.css';
import data from './data'
import { act } from 'react-dom/test-utils';
const { routes, getAirlineById, getAirportByCode } = data

const App = () => {
  const [ perPage, setPerPage ] = useState(25)
  const [ airline, setAirline ] = useState('all')
  const [ airport, setAirport ] = useState('all')
  const [ filteredRoutes, setFilteredRoutes ] = useState(routes)

  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ]

  const getSortedAirports = () => {
    return [...data.airports].sort((a, b) => {
      [ a, b ] = [ a.name, b.name ]
      return a < b ? -1: 1
    })
  }

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
  
  const filterByAirline = (event) => {
    setAirline(event.target.value)
    // filterRoutes('airline', event.target.value)
  }

  const filterByAirport = (event) => {
    setAirport(event.target.value)
    // filterRoutes('airport', event.target.value)
  }

  const resetFilters = () => {
    setAirport("all")
    setAirline("all")
  }

  const getDisabledOptions = (type) => {
    let disabled
    if (type === "airlines" && airport !== 'all') {
      const airportCode = data.airports.find(a => a.name === airport).code
      
      const routesForAirport = routes.filter(r => {
        return r.src === airportCode || r.dest === airportCode})
      
      disabled = data.airlines.filter(a => {
        return !routesForAirport.some(r => r.airline === a.id)
      })
    } else if (type === "airports" && airline !== 'all') {
      const airlineId = data.airlines.find(a => a.name === airline).id
      
      const routesForAirline = routes.filter(r => r.id === airlineId)
      
      disabled = data.airports.filter(a => {
        return !routesForAirline.some(r => {
          return r.src === a.code || r.dest === a.code
        })
      })
    }
    console.log(disabled)
    return disabled
  }

  useEffect(function filterRoutes (){
    const airlineId = data.airlines.find(a => a.name === airline)?.id
    const airportCode = data.airports.find(a => a.name === airport)?.code
    let filtered = routes

    if (airlineId){
      filtered = filtered.filter(r => r.airline === airlineId)
    }
    if (airportCode){
      filtered = filtered.filter(r => r.src === airportCode || r.dest === airportCode)
    }
    
    setFilteredRoutes(filtered)
  }, [airline, airport])
  
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
      </select>
    </label>
    <Select title="Airline" currValue={airline} 
      allOptions={data.airlines} disabledOptions={getDisabledOptions("airlines")} 
      onSelect={filterByAirline} />
    <Select title="Airport" currValue={airport} 
      allOptions={getSortedAirports()} disabledOptions={getDisabledOptions("airports")}
      onSelect={filterByAirport} />
    <button onClick={resetFilters}>Reset</button>
    <p></p>
    <Table className="routes-table" columns={columns} rows={filteredRoutes} format={formatValue} rowsPerPage={perPage}/>
  </div>
  )
}

export default App;
