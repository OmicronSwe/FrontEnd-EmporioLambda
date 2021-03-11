//This class, in this case, is not used, since no model is needed.

import { getlambdaResponsePOST } from "../api/lib/lambdas"

class ListingProductModel {
  async addToCart(session, id) {
    if (session) {
      //authenticated -> add product to remote cart (dynamoDB) through API

      const stringJson = JSON.stringify({
        //payload for API
        email: session.user.email,
        product_id: id,
      })

      const resp = await getlambdaResponsePOST("cart", stringJson) //external API call
      await resp.props.response
    } else {
      //not authenticated -> add product to localstorage
      const cart = localStorage.getItem("cart") //retrieve cart
      let jsonCart

      if (cart != null) {
        jsonCart = JSON.parse(cart)
      } else {
        jsonCart = {
          ids: [],
        }
      }

      jsonCart.ids.push({ product_id: id }) //push new id to the cart
      localStorage.setItem("cart", JSON.stringify(jsonCart)) //update localstorage
    }
  }
}

export default ListingProductModel
