//
import { useRouter } from "next/router";
import "semantic-ui-css/semantic.min.css";
import { Segment } from "semantic-ui-react";
import ListDisplay from "../components/ListDisplay";
import SignOutButton from "../components/SignOutButton";
import { logThing } from "../util";

//
export default function ListDetail() {
  const { query } = useRouter();

  const listId = query.listId;

  return (
    <>
      <Segment>
        <p>list-detail.js</p>
        <SignOutButton></SignOutButton>
      </Segment>
      <Segment>
        <ListDisplay listId={listId} />
      </Segment>
    </>
  );
}

ListDetail.requiresAuthentication = true;
