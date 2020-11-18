import React from 'react'
import { useQuery } from 'react-apollo'
import { gql } from 'apollo-boost'

import Checkout from './checkout.component'

const GET_CART = gql`
  {
    cartItems @client
    priceTotal @client
  }
`

const CheckoutContainer = () => {
  // Using React Apollo hooks
  const {data: {cartItems, priceTotal}}  = useQuery(GET_CART)
  return (
    <Checkout
      cartItems={cartItems}
      total={priceTotal}
    />
  )
}

export default CheckoutContainer
