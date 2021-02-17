import Layout from '../../components/layout'
import { GetServerSideProps } from "next"
import { Product } from "../../interfaces"
import { sampleProductData } from "../../utils/sample-data"
import Link from 'next/link'


type Props = {
  items: Product[]
}

function productLink(id: any){
  return `${id}.tsx`
}

const WithServerSideProps = ({items}: Props) => (
<Layout title="Products List">
    <table id="productsTable">
      <caption> Products list </caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Availability</th>
        </tr>
      </thead>
      <tbody>
        {items.map((items) => (
          <tr>
          <td><Link href={productLink(items.id)}>{items.nome}</Link></td>
          <td>{items.prezzo}</td>
          <td>{items.disponibilita}</td>
        </tr>
        ))}
      </tbody>
    </table>
    </Layout>
)
    

export const getServerSideProps: GetServerSideProps = async () => {
  const items: Product[] = sampleProductData
  return { props: { items } }
}

export default WithServerSideProps