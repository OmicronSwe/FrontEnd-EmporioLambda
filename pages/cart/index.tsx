import Layout from '../../components/layout'
import { GetServerSideProps } from "next"
import { getlambdaResponse } from "../../lib/lambdas"
import Link from 'next/link'
 
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
          <tr>
          <td><Link href={productLink(items.id)}>{items.name}</Link></td>
          <td>{items.description}</td>
        </tr>
        ))}
      </tbody>
    </table>
    </Layout>
  )
}
 
 
export const getServerSideProps: GetServerSideProps = async () => {
  return await getlambdaResponse("product");
}