//
import "semantic-ui-css/semantic.min.css";
import Head from "next/head";
import { useEffect, useRef } from "react";

//
import useSWR from "swr";
import {
  Segment,
  Message,
  Dimmer,
  Loader,
  Button,
  Card,
} from "semantic-ui-react";

//
const apiFetcher = (...args) => fetch(...args).then((res) => res.json());
const storageKeys = { userid: "user-id", other: "other" };

function ChooseUser(username) {
  localStorage.setItem(storageKeys.userid, username);
}

function ErrorMessage(error) {
  return (
    <Message>
      <Message.Header>Oh bother!</Message.Header>
      <p>{error.toString()}</p>
    </Message>
  );
}

function LoginScreen(allUsers) {
  const usersData = allUsers.users.map((user) => (
    <Card key={user.id}>
      <Card.Content>
        <Card.Header>{user.id}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div className="ui  button">
          <Button basic color="green" onClick={() => ChooseUser(user.id)}>
            Login
          </Button>
        </div>
      </Card.Content>
    </Card>
  ));

  return <Segment>{usersData}</Segment>;
}

export default function Home() {
  const { data: storedUser, error: error1 } = useSWR(
    storageKeys.userid,
    (key) => {
      const value = localStorage.getItem(key);
      return value;
    }
  );

  const shouldFetchAllUsers = !!storedUser === false;

  const { data: allUsers, error: error2 } = useSWR(
    shouldFetchAllUsers ? "/api/all-users" : null,
    apiFetcher
  );

  let result = "";
  if (error2) {
    result = ErrorMessage(error2);
  } else if (shouldFetchAllUsers && !allUsers) {
    result = (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  } else {
    if (!!storedUser) {
      result = <Message>Welcome {storedUser}!</Message>;
    } else {
      // Handle errors the same as empty storage item.
      result = LoginScreen(allUsers);
    }
  }

  return (
    <div>
      <Head>
        <title>Steege List</title>
        <meta name="description" content="A list app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {result}
    </div>
  );
}
