//

import Link from "next/link";
import "fomantic-ui-css/semantic.min.css";
import { Menu, Segment } from "semantic-ui-react";
import ListCollection from "../components/ListCollection";
import SignOutButton from "../components/SignOutButton";

//
export default function Dashboard(props) {
  return (
    <div style={{ margin: "1%" }}>
      <Menu>
        <Menu.Menu position="right">
          <Menu.Item>
            <SignOutButton />
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      <Segment>
        <ListCollection />
      </Segment>
    </div>
  );
}

Dashboard.requiresAuthentication = true;
