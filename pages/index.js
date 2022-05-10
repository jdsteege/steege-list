//
import { useSession as useAuthSession, signIn } from "next-auth/react";
import Link from "next/link";

//
import "semantic-ui-css/semantic.min.css";
import { Segment, Header, Button, Grid } from "semantic-ui-react";

//
export default function Home(props) {
  const { data: authSession } = useAuthSession();

  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Segment.Group>
            <Segment color="teal">
              <Header as="h1" color="teal">
                SteegeList
              </Header>
              <Header.Subheader>
                A list app.
                <br />
                Made by Steeges, for Steeges.
              </Header.Subheader>
            </Segment>
            <Segment color="teal">
              {authSession?.user ? (
                <Link href="/dashboard" passHref>
                  <Button color="teal">Dashboard</Button>
                </Link>
              ) : (
                <Button
                  color="teal"
                  onClick={() =>
                    signIn(undefined, { callbackUrl: "/dashboard" })
                  }
                >
                  Sign In
                </Button>
              )}
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid>
    </>
  );
}
