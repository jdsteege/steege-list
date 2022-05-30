//
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Confirm, Container } from "semantic-ui-react";
//
import { db } from "../js/dexie-db";

//
export default function ListActions(props) {
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const router = useRouter();

  const handleDeleteList = () => {
    db.lists.delete(props.list.listId);
    setConfirmDeleteVisible(false);
    router.push("/dashboard");
  };

  return (
    <>
      <Container textAlign="right">
        <Button disabled>Edit</Button>
        <Button color="pink" onClick={() => setConfirmDeleteVisible(true)}>
          Delete
        </Button>
      </Container>

      <Confirm
        open={confirmDeleteVisible}
        header="Confirm list delete"
        content={
          'This will delete "' + props.list?.listName + '" and all its items.'
        }
        cancelButton="Cancel"
        confirmButton="Delete"
        onCancel={() => setConfirmDeleteVisible(false)}
        onConfirm={handleDeleteList}
      />
    </>
  );
}
