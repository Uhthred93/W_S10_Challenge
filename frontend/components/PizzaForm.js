import React, { useReducer } from 'react';
import { useCreateOrderMutation } from '../state/apiSlice';
import { useDispatch } from 'react-redux';
import { useFetchOrderHistoryQuery } from '../state/apiSlice'; // Import the query hook

const initialFormState = {
  fullName: '',
  size: '',
  '1': false, // Pepperoni
  '2': false, // Green Peppers
  '3': false, // Pineapple
  '4': false, // Mushrooms
  '5': false, // Ham
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM':
      return initialFormState;
    default:
      return state;
  }
}

export default function PizzaForm() {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const [createOrder, { isLoading, isError, error }] = useCreateOrderMutation();
  
  // Fetch order history and get refetch function
  const { refetch } = useFetchOrderHistoryQuery();

  // Update form field values
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    dispatch({
      type: 'SET_FIELD',
      field: name,
      value: type === 'checkbox' ? checked : value,
    });
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, size, ...toppings } = formState;

    // Gather selected toppings
    const selectedToppings = Object.keys(toppings).filter((key) => toppings[key]);

    // Send the POST request
    try {
      await createOrder({
        fullName,
        size,
        toppings: selectedToppings,
      }).unwrap();
      
      // Reset the form and refetch the order list
      dispatch({ type: 'RESET_FORM' });
      await refetch(); // Refetch the order history to show the new order
    } catch (err) {
      console.error('Failed to submit order:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className="pending">Order in progress...</div>}
      {isError && <div className="failure">Order failed: {error?.data?.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={formState.fullName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select
            data-testid="sizeSelect"
            id="size"
            name="size"
            value={formState.size}
            onChange={handleChange}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input
            data-testid="checkPepperoni"
            name="1"
            type="checkbox"
            checked={formState['1']}
            onChange={handleChange}
          />
          Pepperoni<br />
        </label>
        <label>
          <input
            data-testid="checkGreenpeppers"
            name="2"
            type="checkbox"
            checked={formState['2']}
            onChange={handleChange}
          />
          Green Peppers<br />
        </label>
        <label>
          <input
            data-testid="checkPineapple"
            name="3"
            type="checkbox"
            checked={formState['3']}
            onChange={handleChange}
          />
          Pineapple<br />
        </label>
        <label>
          <input
            data-testid="checkMushrooms"
            name="4"
            type="checkbox"
            checked={formState['4']}
            onChange={handleChange}
          />
          Mushrooms<br />
        </label>
        <label>
          <input
            data-testid="checkHam"
            name="5"
            type="checkbox"
            checked={formState['5']}
            onChange={handleChange}
          />
          Ham<br />
        </label>
      </div>
      <input data-testid="submit" type="submit" value={isLoading ? 'Submitting...' : 'Submit Order'} />
    </form>
  );
}



