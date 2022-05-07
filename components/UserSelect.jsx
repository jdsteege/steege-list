//
// import "semantic-ui-css/semantic.min.css";
import useSWR from "swr";

//
import {
  Segment,
  Message,
  Dimmer,
  Loader,
  Button,
  Card,
} from "semantic-ui-react";

//
import { storageKeys } from "../global/constants";

//
const apiFetcher = (...args) => fetch(...args).then((res) => res.json());

//
export default function UserSelect() {
  const { data: allUsers, error: error2 } = useSWR(
    "/api/all-users",
    apiFetcher
  );

  if (error2) {
    return ErrorMessage(error2);
  } else if (!allUsers) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  } else {
    const usersData = allUsers.users.map((user) => (
      <Card key={user.id}>
        <Card.Content>
          <Card.Header>{user.id}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <div
            className="ui fluid button"
            onClick={() => {
              ChooseUser(user.id);
            }}
          >
            <Button basic color="green">
              Login
            </Button>
          </div>
        </Card.Content>
      </Card>
    ));

    return <Segment>{usersData}</Segment>;
  }
}

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
