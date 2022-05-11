//
import React, { useState } from "react";
import { useSession as useAuthSession, signOut } from "next-auth/react";
import { Button, Dimmer, Loader } from "semantic-ui-react";

//
export default function SignOutButton() {
  const { data: authSession } = useAuthSession();
  const [dimmed, setDimmed] = useState(false);

  return (
    <>
      <Dimmer active={dimmed} page>
        <Loader />
      </Dimmer>
      Signed in as {authSession?.user?.firstname} <br />
      <Button
        onClick={() => {
          setDimmed(true);
          signOut({ callbackUrl: "/" });
        }}
      >
        Sign out
      </Button>
    </>
  );
}
