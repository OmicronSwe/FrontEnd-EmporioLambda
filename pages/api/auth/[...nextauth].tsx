import NextAuth from "next-auth"
import Providers from "next-auth/providers"

const options = {
  site: process.env.NEXT_PUBLIC_SITE || "http://localhost:3000",
  session: { jwt: true },
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken
      }
      return token
    },
    async session(session, token) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken
      }
      return session
    },
  },
  providers: [
    Providers.Cognito({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      domain: process.env.COGNITO_DOMAIN,
    }),
  ],
}

export default (req, res) => NextAuth(req, res, options)
