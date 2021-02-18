import Layout from "../../components/layout"
import Head from "next/head"

import { getlambdaResponsePOST } from "../../lib/lambdas"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"

import styles from "../../styles/lambda.module.css"

export default function Lambda({
  response,
}: {
  response: {
    message: string
  }
}) {

  return (
    <Layout>
      <Head>
        <title>Test inserimento</title>
      </Head>
      <article>
        <div dangerouslySetInnerHTML={{ __html: response.message }} />
      </article>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {  
  return await getlambdaResponsePOST("products", JSON.parse('{"name":"test","description":"test description"}'));
}
