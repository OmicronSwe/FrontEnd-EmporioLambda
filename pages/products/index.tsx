import Layout from "../../components/layout"
import { GetServerSideProps } from "next"
import { getlambdaResponse } from "../../lib/lambdas"

/*type Props = {
  items: Product[]
}

function productLink(id: any){
  return `${id}.tsx`
}*/

export default function product({ response }) {
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
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  /*const items: Product[] = sampleProductData
  return { props: { items } }*/

  return await getlambdaResponse("product")
}
