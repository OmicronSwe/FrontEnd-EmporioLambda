import Layout from "../../components/layout"
import Head from "next/head"

import { getlambdaResponse } from "../../lib/lambdas"
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
        <title>Lambda test</title>
      </Head>
      <article>
        <h1>
          Risposta della Lambda <strong>test</strong>
        </h1>
        <div dangerouslySetInnerHTML={{ __html: response.message }} />
      </article>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    'https://wom28o1ly9.execute-api.eu-central-1.amazonaws.com/local/product',
    {
      
      body: JSON.stringify({
        name: "cors89",
        description: "cors"
      }),
      mode: 'no-cors',
      headers: {
        
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const data = await res.json()

    return data;
}
