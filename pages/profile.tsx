import { useSession } from 'next-auth/client'
import Layout from "../components/layout"

const ProfilePage = () => {
  const [session, loading] = useSession();

  if (loading) return null;
  if (!session) return (
    <Layout title="Profile | Next.js + TypeScript Example">
      <p>Utente non autenticato</p>
    </Layout >
  );
  return (
    <Layout>
      {session && (
        <>
          <h1>Hello {session.user.name}!</h1>
          <h4>Session:</h4>
          <p>
            {JSON.stringify(session, null, 2)}
          </p>
        </>
      )}
    </Layout>
  )
};

export default ProfilePage
