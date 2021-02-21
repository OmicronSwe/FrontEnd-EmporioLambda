import { getSession } from "next-auth/client"
import Layout from "../components/layout"
import { GetServerSideProps } from "next"

const ProfilePage = ({session}) => {
  if (!session)
    return (
      <Layout title="Profile | Next.js + TypeScript Example">
        <p>Utente non autenticato</p>
      </Layout>
    )
  return (
    <Layout>
      {session && (
        <>
          <h1>Hello {session.user.name}!</h1>
          <h4>Session:</h4>
          <p>{JSON.stringify(session, null, 2)}</p>
        </>
      )}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({req});
  return {props:{
    session
  }}
}

export default ProfilePage
