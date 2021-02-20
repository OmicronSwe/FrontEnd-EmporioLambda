import Layout from '../../components/layout'
import { GetServerSideProps } from "next"
import { getlambdaResponse } from "../../lib/lambdas"
import Link from 'next/link'

import Cookies from 'cookies'
import { getCookieParser } from 'next/dist/next-server/server/api-utils'
 
function productLink(id: any){
  return `${id}.tsx`
}

 
export default function product({ response }) {
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
        {response.map((items) => (
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
 
 

export const getServerSideProps: GetServerSideProps = async ({req,res}) => {
    const cookies = new Cookies(req, res);

    var respJson = {
      props: {
        response: []
      }
    }

    const IDS = JSON.parse(cookies.get("cart")).ids;

    for (const item of IDS) {
      const response = await getlambdaResponse("product/getFromId/"+item);  
      respJson.props.response.push(response.props.response);
    }
  
    return respJson
}
