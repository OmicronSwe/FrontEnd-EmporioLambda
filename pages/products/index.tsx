import Layout from "../../components/layout"
import { GetServerSideProps } from "next"
import { getlambdaResponse } from "../api/lib/lambdas"
import React from "react"

/*type Props = {
  items: Product[]
}

function productLink(id: any){
  return `${id}.tsx`
}*/

const product = ({ response }) => {
  function addToCart(id: string) {
    const cart = localStorage.getItem("cart")
    let jsonCart

    if (cart != null) {
      jsonCart = JSON.parse(cart)
    } else {
      jsonCart = {
        ids: [],
      }
    }

    jsonCart.ids.push(id)
    localStorage.setItem("cart", JSON.stringify(jsonCart))
  }

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
                <button onClick={() => addToCart(items.id)}>Add to Cart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default product

export const getServerSideProps: GetServerSideProps = async () => {
  return await getlambdaResponse("product")
}
