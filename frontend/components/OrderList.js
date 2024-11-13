import React, { useState } from 'react';
import { useFetchOrderHistoryQuery } from '../state/apiSlice';

const OrderList = () => {
  const { data: orders = [], error, isLoading } = useFetchOrderHistoryQuery();
  const [filter, setFilter] = useState('All');

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching orders</p>;

  const filteredOrders = filter === 'All' ? orders : orders.filter(order => order.size === filter);

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {filteredOrders.map((order, index) => (
          <li key={index}>
            <div>
              <p>{order.fullName} ordered a size {order.size}</p>
              <p>Toppings: {order.toppings.length > 0 ? order.toppings.join(', ') : 'No toppings selected'}</p>
            </div>
          </li>
        ))}
      </ol>

      <div id="sizeFilters">
        <p>Filter by size:</p>
        {['All', 'S', 'M', 'L'].map((size) => {
          const className = `button-filter${size === filter ? ' active' : ''}`;
          return (
            <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick={() => setFilter(size)}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OrderList;


