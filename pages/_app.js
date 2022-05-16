//
import "../styles/globals.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession as useAuthSession } from "next-auth/react";
import { Segment, Loader } from "semantic-ui-react";

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
        {Component.requiresAuthentication ? (
          <>
            <CheckAuthentication>
              <Component {...pageProps} />
            </CheckAuthentication>
          </>
        ) : (
          <>
            <Component {...pageProps} />
          </>
        )}
      </SessionProvider>
    </>
  );
}

export default MyApp;

//
function CheckAuthentication({ children }) {
  const router = useRouter();
  const { status } = useAuthSession({
    required: true,
    onUnauthenticated() {
      router.replace("/");
    },
  });

  if (status === "loading") {
    return (
      <>
        <Loader active />
      </>
    );
  }

  return children;
}
