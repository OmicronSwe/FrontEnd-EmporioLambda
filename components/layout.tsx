import React, { ReactNode } from "react"
import Link from "next/link"
import Head from "next/head"
import Image from "next/image"
import { signin, signout, useSession } from "next-auth/client"

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = "This is the default title" }: Props) => {
  const [session] = useSession()

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <div className="logo">
          <Image src="/images/Emporio_Lambda.png" layout="intrinsic" width={2488} height={398} />
        </div>
        <style jsx>{`
          .logo {
            max-width: 40em;
            margin: auto;
            padding-top: 1em;
          }
        `}</style>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/users">
            <a>Users List</a>
          </Link>
          <Link href="/profile">
            <a>Profile</a>
          </Link>
          <Link href="/lambdas">
            <a>Lambdas List</a>
          </Link>
          <Link href="/api/users">
            <a>Users API</a>
          </Link>
          <Link href="/api/lambdas">
            <a>Lambdas API</a>
          </Link>
          {!session && (
            <span>
              <button
                className="signInButton"
                onClick={(e) => {
                  e.preventDefault()
                  signin("cognito")
                }}
              >
                Sign in
              </button>
            </span>
          )}
          {session && (
            <span>
              <button
                className="signOutButton"
                onClick={(e) => {
                  e.preventDefault()
                  signout({ callbackUrl: `${process.env.NEXT_PUBLIC_SITE}/api/auth/logout` })
                }}
              >
                Sign out
              </button>
            </span>
          )}
        </nav>
      </header>
      <div className="content">{children}</div>
      <footer id="footer">
        <div>
          <span>By Omicron</span>
          <Link href="https://github.com/OmicronSwe/FrontEnd-EmporioLambda/">
            <a>Repo Frontend</a>
          </Link>
          <Link href="https://github.com/OmicronSwe/BackEnd-EmporioLambda">
            <a>Repo Backend</a>
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default Layout
