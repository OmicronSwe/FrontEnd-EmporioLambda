import React, { Component } from "react"
import Layout from "../../components/layout"
import PayButton from "../../components/PayButton"
import { GetServerSideProps } from "next"
import { getlambdaResponse } from "../api/lib/lambdas"
import { getSession } from "next-auth/client"

/*
Here a React component is needed, because to get the products from the LocalStorage before rendering the page we need the function componentDidMount(), 
basically loading the data client-side. LocalStorage can't be read server-side and trying to load data without specific React functions gives errors.
Other solutions, like server-side cookies, were considered, but they only work until the browser is closed.

The state of the component contains the items of the cart. When the state is changed (items are removed or items are loaded), 
the component automatically re-renders his part of the page.
*/

class Cart extends Component<{ response; auth }, { items: string }> {
  constructor(props) {
    super(props)
    this.state = { items: "" }
    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    this.getData()
  }

  /*
  Gets the the cart's product ids, from the server-side prop "response" (external API call) or from the LocalStorage, based on the session data (prop "auth").
  Updates the component state with the product data received from an external api call.
  */
  async getData() {
    const respJson = {
      response: [],
    }

    let jsonCart
    console.log(this.props.auth)
    if (this.props.auth) {
      //authenticated -> cart's product ids are in the response prop
      jsonCart = this.props.response.products_id != null ? this.props.response.products_id : []
    } else {
      //not authenticated -> cart's product ids are in the LocalStorage
      jsonCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).ids : []
    }

    if (jsonCart.length > 0) {
      //if there are items in the cart
      for (const item of jsonCart) {
        //for every item gets the data of the product
        const res = await fetch("../api/cart", {
          // internal API to call external API to get the product data based on the id
          body: JSON.stringify({ id: item.product_id }),
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        })
        const result = await res.json()

        respJson.response.push(result) //push the data on a JSON
      }
    }

    this.setState({ items: JSON.stringify(respJson) }) //insert the data in the state of the component
  }

  render() {
    let products = []
    if (this.state.items != "") {
      products = JSON.parse(this.state.items).response
    }

    return (
      <Layout title="Shopping Cart">
        <table id="productsTable">
          <caption> Shopping Cart </caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {products.map((items) => (
              <tr key={items.id}>
                <td>{items.name}</td>
                <td>{items.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => this.RemoveAll()}>RemoveAll</button>

        <p>Use test@email.com, 4242 4242 4242 4242, and any CVC and future expiration date.</p>
        {products.length > 0 ? <PayButton amount={products.length * 100} /> : null}
        <p id="message"></p>
      </Layout>
    )
  }

  //removes the items from the cart
  async RemoveAll() {
    if (this.props.auth) {
      //authenticated -> internal API to call external API to delete the cart
      const res = await fetch("../api/deleteCart", {
        body: this.props.auth,
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
      await res.json()
      this.setState({ items: "" }) //update the state, so that the component re-renders the items
    } else {
      //not authenticated -> empty the localStorage
      localStorage.clear()
      this.setState({ items: "" }) //update the state, so that the component re-renders the items
    }
  }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req }) //get session data
  if (session) {
    const resp = await (await getlambdaResponse("cart/" + session.user.email)).props.response //external API call to get cart's product ids

    if (resp.message == "Element not found") {
      //if no cart is found, return empty response
      return { props: { response: [], auth: session.user.email } }
    }
    return { props: { response: resp, auth: session.user.email } }
  } else {
    return { props: { response: [], auth: null } } //if not authenticated, return empty response and null email
  }
}

export default Cart
