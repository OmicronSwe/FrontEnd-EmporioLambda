import Layout from "../../components/layout"
import { GetServerSideProps } from "next"
import { getlambdaResponse } from "../api/lib/lambdas"
import { getSession } from "next-auth/client"
import React from "react"

async function addToCart(id: string, session) {
  if (session) {
    const stringJson = JSON.stringify({
      email: session.user.email,
      product_id: id,
    })

    const res = await fetch("../api/insertCart", {
      body: stringJson,
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })

    const result = await res.json()
    console.log(result)
  } else {
    const cart = localStorage.getItem("cart")
    let jsonCart

    if (cart != null) {
      jsonCart = JSON.parse(cart)
    } else {
      jsonCart = {
        ids: [],
      }
    }

    jsonCart.ids.push({ product_id: id })
    localStorage.setItem("cart", JSON.stringify(jsonCart))
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
      response: await (await getlambdaResponse("product")).props.response,
      session: await getSession({ req }),
    },
  }
}
