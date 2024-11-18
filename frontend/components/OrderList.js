import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFetchOrderHistoryQuery } from '../state/apiSlice';
import { setFilter } from '../state/slices/filterSlice';

const OrderList = () => {
  const { data: orders = [], error, isLoading } = useFetchOrderHistoryQuery();
  const filter = useSelector((state) => state.filter); // Get filter state from Redux
  const dispatch = useDispatch();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message || 'Failed to fetch orders.'}</p>;

  // Filter the orders based on the selected filter
  const filteredOrders = filter === 'All' ? orders : orders.filter(order => order.size === filter);

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {filteredOrders.map((order) => (
          <li key={order.id}>
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
              onClick={() => dispatch(setFilter(size))} // Dispatch the filter action
              aria-pressed={size === filter}
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


