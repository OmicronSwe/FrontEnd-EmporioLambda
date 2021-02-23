import React, { Component } from "react"
import Layout from "../../components/layout"
import PayButton from "../../components/PayButton"
import { GetServerSideProps } from "next"
import { getlambdaResponse } from "../api/lib/lambdas"
import { getSession } from "next-auth/client"

class Cart extends Component<{ response; auth }, { items: string }> {
  constructor(props) {
    super(props)
    this.state = { items: "" }
    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    this.getData()
  }

  async getData() {
    const respJson = {
      response: [],
    }

    let jsonCart

    if (this.props.auth) {
      jsonCart = this.props.response.products_id
    } else {
      jsonCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).ids : []
    }

    if (jsonCart.length > 0) {
      for (const item of jsonCart) {
        const res = await fetch("../api/cart", {
          body: JSON.stringify({ id: item.product_id }),
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        })
        const result = await res.json()

        respJson.response.push(result)
      }
    }

    this.setState({ items: JSON.stringify(respJson) })
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

  async RemoveAll() {
    if (this.props.auth) {
      const res = await fetch("../api/deleteCart", {
        body: this.props.auth,
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
      await res.json()
      this.setState({ items: "" })
    } else {
      localStorage.clear()
      this.setState({ items: "" })
    }
  }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  if (session) {
    const resp = await (await getlambdaResponse("cart/" + session.user.email)).props.response
    if (resp.message == "Element not found") {
      return { props: { response: [], email: session.user.email } }
    }
    return { props: { response: resp, auth: session.user.email } }
  } else {
    return { props: { response: [], auth: null } }
  }
}

export default Cart
