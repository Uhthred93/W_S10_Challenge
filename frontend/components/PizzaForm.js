import axios from 'axios';
import React, { useState } from 'react'

const initialFormState = {
  fullName: '',
  size :'',
  toppings : []
}

export default function PizzaForm({ onOrderPost = () => {} }) {

  const [submitting, setSubmitting] = useState(false)
  const [error,setError] = useState(false)

  const [order,setOrder] = useState(initialFormState)

  const fullNameChange = (e) => {
    setOrder( { ...order, fullName : e.target.value})
  }

  const sizeChange = (e) => {
    setOrder( { ...order, size : e.target.value})
  }

  const checkTopping = (e) => {
    let toppings = []
    
    order.toppings.forEach((t) => {
      toppings.push(t)
    })

    const i = toppings.indexOf( e.target.name ) 
    if ( i == -1 )
    {
      toppings.push( e.target.name )
    }
    else
    {
      toppings.splice(i,1)
    }

    setOrder({...order, toppings })


  }


  const handleSubmit = async ( event ) => {

    setError(false)
    event.preventDefault();

    if ( order.fullName.trim() == '' ) {
      setError("fullName is required");
      return;
    }

    if ( order.size.trim() == '' ) {
      setError("size must be one of the following values")
      return;
    }

    try {
      setSubmitting(true)
      const response = await axios.post("http://localhost:9009/api/pizza/order", order )
      onOrderPost();
      setOrder(initialFormState)
    } catch ( e ) 
    {

    }

    setSubmitting(false)

  }

  const changeForm = (e) => {
    
  }
  return (
    <form onSubmit={handleSubmit} onChange={changeForm}>
      <h2>Pizza Form</h2>
      {submitting && <div className='pending'>Order in progress...</div>}
      {error && <div className='failure'>Order failed: {error}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            onChange={fullNameChange}
            value={order.fullName}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" onChange={sizeChange}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" onChange={checkTopping}/>
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" onChange={checkTopping}/>
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" onChange={checkTopping}/>
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" onChange={checkTopping}/>
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" onChange={checkTopping} />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit"/>
    </form>
  )
}

