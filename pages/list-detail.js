//
import { useRouter } from "next/router";
import Link from "next/link";
import "semantic-ui-css/semantic.min.css";
import { Segment, Input } from "semantic-ui-react";
import ListDisplay from "../components/ListDisplay";
import SignOutButton from "../components/SignOutButton";
import { logThing } from "../js/util";

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
        <Link href="/dashboard">
          <a>&lt; Back</a>
        </Link>
        <ListDisplay listId={listId} />
      </Segment>
    </>
  );
}

ListDetail.requiresAuthentication = true;
