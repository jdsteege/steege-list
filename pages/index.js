//
import React from "react";

import "semantic-ui-css/semantic.min.css";
import Head from "next/head";
import useSWR from "swr";

//
import { Message } from "semantic-ui-react";

//
import UserSelect from "../components/UserSelect";
import LoginButton from "../components/LoginButton";
import { storageKeys } from "../global/constants";

//
export default function Home() {
  const { data: storedUser, error: error1 } = useSWR(
    storageKeys.userid,
    (key) => {
      const value = localStorage.getItem(key);
      return value;
    }
  );

  let result = "";
  if (!!storedUser) {
    result = <Message>Welcome {storedUser}!</Message>;
  } else {
    result = <UserSelect />;
  }

  return (
    <div>
      <Head>
        <title>Steege List</title>
        <meta name="description" content="A list app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoginButton></LoginButton>
      {result}
    </div>
  );
}
