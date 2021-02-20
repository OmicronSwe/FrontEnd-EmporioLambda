import Layout from '../../components/layout'
import { GetServerSideProps } from "next"
import { getlambdaResponse } from "../../lib/lambdas"
 

 
export default async function product() {


  const ISSERVER = typeof window === "undefined";

  if(!ISSERVER) {

    var respJson = {
      response: []
    }

    const cart = localStorage.getItem("cart");
    var jsonCart;

    if(cart!=null){
      jsonCart = JSON.parse(cart).ids;
      for (const item of jsonCart) {
        const res = await fetch("../api/cart", {
          body: JSON.stringify({id:item}),
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        })
        const result = await res.json()

        respJson.response.push(result.props.response);
      }
    }

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
        {respJson.response.map((items) => (
          <tr key={items.id}>
          <td>{items.name}</td>
          <td>{items.description}</td>
        </tr>
        ))}
      </tbody>
    </table>
    </Layout>
  )
}
 