import React, { Component } from "react"
import Layout from "../../components/layout"
import PayButton from "../../components/PayButton"

class Cart extends Component<unknown, { items: string }> {
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

    const cart = localStorage.getItem("cart")
    let jsonCart

    if (cart != null) {
      jsonCart = JSON.parse(cart).ids
      for (const item of jsonCart) {
        console.log(item)
        const res = await fetch("../api/cart", {
          body: JSON.stringify({ id: item }),
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

  RemoveAll() {
    localStorage.clear()
    this.setState({ items: "" })
  }
}

export default Cart
