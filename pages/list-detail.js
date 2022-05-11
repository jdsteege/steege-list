//
import "semantic-ui-css/semantic.min.css";
import { Segment } from "semantic-ui-react";
import ListDisplay from "../components/ListDisplay";
import SignOutButton from "../components/SignOutButton";

//
export default function ListDetail(props) {
  return (
    <>
      <Segment>
        <p>list-detail.js</p>
        <SignOutButton></SignOutButton>
      </Segment>
      <Segment>
        <ListDisplay />
      </Segment>
    </>
  );
}

ListDetail.requiresAuthentication = true;
