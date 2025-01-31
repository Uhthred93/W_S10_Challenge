import React, { useEffect, useState } from 'react'
import PizzaForm from './PizzaForm'
import OrderList from './OrderList'
import axios from 'axios'

export default function App() {

  const [ orders , setOrders ] = useState([])

  const load = async () => {
    const response = await axios.get( "http://localhost:9009/api/pizza/history")
    console.log( response )
    setOrders( response.data )
  }

  useEffect( () => {
    load();
  },[])

  return (
    <div id="app">
      <PizzaForm onOrderPost={load}/>
      <OrderList orders={orders}/>
    </div>
  )
}