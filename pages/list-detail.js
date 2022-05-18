//
import { useRouter } from "next/router";
import Link from "next/link";
import "semantic-ui-css/semantic.min.css";
import { Segment, Input, Menu } from "semantic-ui-react";
import ListDisplay from "../components/ListDisplay";
import SignOutButton from "../components/SignOutButton";
import { logThing } from "../js/util";

//
export default function ListDetail() {
  const { query } = useRouter();

  const listId = query.listId;

  return (
    <div style={{ margin: "1%" }}>
      <Menu>
        <Link href="/dashboard" passHref>
          <Menu.Item name="Back" />
        </Link>
        <Menu.Menu position="right">
          <Menu.Item>
            <SignOutButton />
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      <Segment>
        <ListDisplay listId={listId} />
      </Segment>
    </div>
  );
}

ListDetail.requiresAuthentication = true;
