import Layout from "../../components/layout"
import { GetServerSideProps } from "next"
import { getlambdaResponse } from "../api/lib/lambdas"
import { getSession } from "next-auth/client"
import React from "react"

async function addToCart(id: string, session) {
  if (session) {
    //authenticated -> add product to remote cart (dynamoDB) through API

    const stringJson = JSON.stringify({
      //payload for API
      email: session.user.email,
      product_id: id,
    })

    const res = await fetch("../api/insertCart", {
      //internal API request to call the external API
      body: stringJson,
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })

    await res.json()
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

export default function product({ response, session }) {
  return (
    <Layout title="Products List">
      <table id="productsTable">
        <caption> Products list </caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {response.map((items) => (
            <tr key={items.id}>
              <td>{items.name}</td>
              <td>{items.description}</td>
              <td>
                <button onClick={() => addToCart(items.id, session)}>Add to Cart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      response: await (await getlambdaResponse("product")).props.response, //return API response
      session: await getSession({ req }), //return session data
    },
  }
}
