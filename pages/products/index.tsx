import Head from 'next/head'
import Layout from '../../components/layout'
import { GetServerSideProps } from "next"
import { Product } from "../../interfaces"
import { sampleProductData } from "../../utils/sample-data"
import Link from 'next/link'

type Props = {
  items: Product[]
}

const WithServerSideProps = ({ items }: Props) => (
<Layout title="Products List">
    <table>
      <caption> Products list </caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Availability</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, idx) => (
          <tr>
            <th><Link href='{item.id}.tsx'>item.nome</Link></th>
            <th>item.prezzo</th>
            <th>item.disponibilita</th>
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