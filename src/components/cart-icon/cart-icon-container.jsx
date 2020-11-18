import React from 'react'
import { flowRight } from 'lodash'
import { Mutation, Query, graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

import CartIcon from './cart-icon.component'

const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`

const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`

const CartIconContainer = ({ data: { itemCount }, toggleCartHidden }) => {
  // <Query query={GET_ITEM_COUNT}>
  //   {
  //     ({ data: { itemCount } }) => (
  //       <Mutation mutation={TOGGLE_CART_HIDDEN}>
  //         {
  //           toggleCartHidden => (
  //             <CartIcon
  //               itemCount={itemCount}
  //               toggleCartHidden={toggleCartHidden}
  //             />)
  //         }
  //       </Mutation>
  //     )
  //   }
  // </Query>
  return <CartIcon itemCount={itemCount} toggleCartHidden={toggleCartHidden} />
}

export default flowRight(
  graphql(GET_ITEM_COUNT),
  // second parameter gives the variable the name we want
  graphql(TOGGLE_CART_HIDDEN, { name: 'toggleCartHidden' }),
)(CartIconContainer)
