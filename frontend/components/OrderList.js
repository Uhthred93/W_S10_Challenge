import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function OrderList({ orders }) {

  
  const [filter, setFilter] = useState("All")

  const handleFilter = (size) => {
    setFilter( size )
  }

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders.map((order, index) => {

            if ( order.size != filter && filter != 'All') return;

            const message  = order.customer + " ordered a size " + order.size + " with " + ( order.toppings ? order.toppings.length : 'no') + " toppings"
            return (
              <li key={index}>
                <div>
                  {message}
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === 'All' ? ' active' : ''}`
            return <button
              onClick={() => handleFilter(size)}
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}

