import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    site: process.env.NEXT_PUBLIC_SITE || 'http://localhost:3000',

    providers: [
        Providers.Cognito({
            clientId: process.env.COGNITO_CLIENT_ID,
            clientSecret: process.env.COGNITO_CLIENT_SECRET,
            domain: process.env.COGNITO_DOMAIN,
        }),
    ]
}

export default (req, res) => NextAuth(req, res, options);