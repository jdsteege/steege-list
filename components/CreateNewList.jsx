import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form } from "semantic-ui-react";

export default function CreateNewList(props) {
  const [newListName, setNewListName] = useState("");
  const router = useRouter();

  async function addList() {
    if (!newListName) return;

    const newListId = await db.lists.add({
      listId: uuidv4(),
      listName: newListName,
      sortPos: props.nextSortPos,
    });

    setNewListName("");
    router.push("/list-detail?listId=" + newListId);
  }

  return (
    <Form
      onSubmit={() => addList()}
      style={{ margin: "20px", maxWidth: "500px" }}
    >
      <Form.Input
        value={newListName}
        onChange={(ev) => setNewListName(ev.target.value)}
        action={<Button color="teal">Create List</Button>}
      />
    </Form>
  );
}
