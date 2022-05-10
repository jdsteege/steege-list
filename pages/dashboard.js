//
import { useSession, signIn } from "next-auth/react";

//
import "semantic-ui-css/semantic.min.css";
import { Segment, Header, Button, Grid } from "semantic-ui-react";
import SignOutButton from "../components/SignOutButton";

//
export default function Home(props) {
  return (
    <Segment>
      <p>dashboard.js</p>
      <SignOutButton></SignOutButton>
    </Segment>
  );
}
