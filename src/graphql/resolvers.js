import { gql } from 'apollo-boost'

import {
  addItemToCart,
  removeItemFromCart,
  getCartItemCount,
  clearItemFromCart,
  cartPriceTotal,
} from './cart.utils'

export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }
  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
    RemoveItemToCart(item: Item!): [Item]!
    ClearItemFromCart(item: Item!): [Item]!
    CartPriceTotal: Float!
  }
`
// @client means its on the client side/local cache
const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`
const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`
const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`
const GET_PRICE_TOTAL = gql `
  {
    priceTotal @client
  }
`

export const resolvers = {
  Mutation: {
    // _root, _args, _context, _info means they will not be modified
    // _context Apollo client has access to client and cache, destructing to just get cache
    toggleCartHidden: (_root, _args, { cache }) => {
      const { cartHidden } = cache.readQuery({ // destructing data object to get variable we need
        query: GET_CART_HIDDEN,
        // variables: {} if you need to pass in values
      })

      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: {
          cartHidden: !cartHidden,
        }
      })

      return !cartHidden
    },

    // Add cart items
    addItemToCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      })
      const newCartItems = addItemToCart(cartItems, item)
      const newTotal = cartPriceTotal(newCartItems)

      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: {
          itemCount: getCartItemCount(newCartItems)
        }
      })
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: {
          cartItems: newCartItems,
        }
      })
      cache.writeQuery({
        query: GET_PRICE_TOTAL,
        data: {
          priceTotal: newTotal,
        }
      })

      return newCartItems
    },
    // Remove cart items
    removeItemToCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      })
      const newCartItems = removeItemFromCart(cartItems, item)
      const newTotal = cartPriceTotal(newCartItems)

      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: {
          itemCount: getCartItemCount(newCartItems)
        }
      })
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: {
          cartItems: newCartItems
        }
      })
      cache.writeQuery({
        query: GET_PRICE_TOTAL,
        data: {
          priceTotal: newTotal,
        }
      })

      return newCartItems
    },
    // Remove item from cart
    clearItemFromCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      })
      const newCartItems = clearItemFromCart(cartItems, item)
      const newTotal = cartPriceTotal(newCartItems)

      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: {
          itemCount: getCartItemCount(newCartItems)
        }
      })
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: {
          cartItems: newCartItems,
        }
      })
      cache.writeQuery({
        query: GET_PRICE_TOTAL,
        data: {
          priceTotal: newTotal,
        }
      })

      return newCartItems
    },
  }
}
