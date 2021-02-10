import { GetStaticProps } from "next"
import Link from "next/link"

import { Lambda } from "../../interfaces"
import { sampleLambdaData } from "../../utils/sample-data"
import Layout from "../../components/layout"
import List from "../../components/lambda/list"
import "../../styles/lambda.module.css"

type Props = {
  items: Lambda[]
}

const WithStaticProps = ({ items }: Props) => (
  <Layout title="Lambda List">
    <h1>Lambda List</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <List items={items} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items: Lambda[] = sampleLambdaData
  return { props: { items } }
}

export default WithStaticProps
