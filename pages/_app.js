//
// import "../styles/globals.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

//
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>Steege List</title>
        <meta
          name="description"
          content="A list app, made by Steeges, for Steeges."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        {/* <p>_app.js</p> */}
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
