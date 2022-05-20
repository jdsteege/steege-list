//
import { useRouter } from "next/router";
import Link from "next/link";
import "fomantic-ui-css/semantic.min.css";
import { Segment, Input, Menu } from "semantic-ui-react";
import ListDisplay from "../components/ListDisplay";
import SignOutButton from "../components/SignOutButton";
import { logThing } from "../js/util";

//
export default function ListDetail() {
  const router = useRouter();

  const listId = router.query.listId;

  return (
    <div style={{ margin: "1%" }}>
      <Menu>
        <Menu.Item name="Back" onClick={() => router.back()} />

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
