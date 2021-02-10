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
  const router = useRouter()
  const { funName } = router.query

  return (
    <Layout>
      <Head>
        <title>Lambda {funName}</title>
      </Head>
      <article>
        <h1>
          Risposta della Lambda <strong className={styles.funName}>{funName}</strong>
        </h1>
        <div dangerouslySetInnerHTML={{ __html: response.message }} />
      </article>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return await getlambdaResponse(params.funName as string)
}
