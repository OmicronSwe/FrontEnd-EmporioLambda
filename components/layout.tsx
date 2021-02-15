import React, { ReactNode } from "react"
import Link from "next/link"
import Head from "next/head"
import { signin, signout, useSession } from 'next-auth/client'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = "This is the default title" }: Props) => {
  const [session, loading] = useSession();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>{" "}
        |{" "}
          <Link href="/about">
            <a>About</a>
          </Link>{" "}
        |{" "}
          <Link href="/users">
            <a>Users List</a>
          </Link>{" "}
        |{" "}
          <Link href="/profile">
            <a>Profile</a>
          </Link>{" "}
        |{" "}
          <Link href="/lambdas">
            <a>Lambdas List</a>
          </Link>{" "}
        | <a href="/api/users">Users API</a> | <a href="/api/lambdas">Lambdas API</a>
          {!session && (
            <span>
              |
              <button className="signInButton" onClick={(e) => {
                e.preventDefault();
                signin('cognito');
              }}>Sign in</button>
            </span>
          )}
          {session && (
            <span>
              |
              <button className="signOutButton" onClick={(e) => {
                e.preventDefault();
                signout({ callbackUrl: `${process.env.NEXT_PUBLIC_SITE}/api/auth/logout` });
              }}>Sign out</button>
            </span>
          )}
        </nav>
      </header>
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  );
};

export default Layout
