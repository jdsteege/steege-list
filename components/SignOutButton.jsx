//
import { useSession as useAuthSession, signIn, signOut } from "next-auth/react";

//
import { Modal, Button } from "semantic-ui-react";

//
export default function SignOutButton() {
  const { data: authSession } = useAuthSession();

  if (authSession) {
    return (
      <>
        Signed in as {authSession.user.firstname} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  } else {
    return (
      <>
        <p>Wait...</p>
      </>
    );
  }
}
