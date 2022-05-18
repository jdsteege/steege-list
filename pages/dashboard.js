//

import "semantic-ui-css/semantic.min.css";
import { Segment } from "semantic-ui-react";
import ListCollection from "../components/ListCollection";
import SignOutButton from "../components/SignOutButton";

//
export default function Dashboard(props) {
  return (
    <div style={{ margin: "1%" }}>
      <Segment>
        <p>dashboard.js</p>
        <SignOutButton></SignOutButton>
      </Segment>
      <Segment>
        <ListCollection />
      </Segment>
    </div>
  );
}

Dashboard.requiresAuthentication = true;
