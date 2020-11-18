import React from 'react'
import { graphql, useMutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { flowRight } from 'lodash'

import CheckoutItem from './checkout-item.component'

const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item!) {
    addItemToCart(item: $item) @client
  }
`
const REMOVE_ITEM_TO_CART = gql`
  mutation RemoveItemToCart($item: Item!) {
    removeItemToCart(item: $item) @client
  }
`
const CLEAR_ITEM_FROM_CART = gql`
  mutation ClearItemFromCart($item: Item!) {
    clearItemFromCart(item: $item) @client
  }
`

const CheckoutItemContainer = (props) => {
  const [addItemToCart] = useMutation(ADD_ITEM_TO_CART)
  const [removeItemToCart] = useMutation(REMOVE_ITEM_TO_CART, {name: 'removeItemToCart'})
  const [clearItemFromCart] = useMutation(CLEAR_ITEM_FROM_CART, {name: 'clearItemFromCart'})
  return(
  <CheckoutItem
    {...props}
      addItem={item => addItemToCart({ variables: { item } })}
    removeItem={item => removeItemToCart({ variables: { item } })}
    clearItem={item => clearItemFromCart({ variables: { item } })}
  />
)}

// export default flowRight(
//   graphql(ADD_ITEM_TO_CART, { name: 'addItemToCart' }),
//   graphql(REMOVE_ITEM_TO_CART, { name: 'removeItemToCart' }),
//   graphql(CLEAR_ITEM_FROM_CART, { name: 'clearItemFromCart' }),
// )(CheckoutItemContainer)

export default CheckoutItemContainer
