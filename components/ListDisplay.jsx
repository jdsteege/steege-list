//
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
//
import { db } from "../js/dexie-db";
import ItemDetails from "./ItemDetails";
import ListActions from "./ListActions";
import TextAreaAutosize from "./TextAreaAutosize";

//
export default function ListDisplay(props) {
  const [listName, setListName] = useState("");
  const [newItemName, setNewItemName] = useState("");

  const list = useLiveQuery(() =>
    db.lists
      .where("listId")
      .equals(props.listId)
      .first((l) => {
        setListName(l.listName);
        return l;
      })
  );
  const items = useLiveQuery(() =>
    db.items.where("itemListId").equals(props.listId).sortBy("sortPos")
  );

  console.log("a " + list);

  function nextSortPos() {
    if (!items || items.length <= 0) {
      return 0;
    }
    return items[items.length - 1].sortPos + 1;
  }

  async function addItem() {
    if (!newItemName) return;
    const id = await db.items.add({
      itemId: uuidv4(),
      itemListId: props.listId,
      label: newItemName,
      isComplete: false,
      sortPos: nextSortPos(),
    });
    setNewItemName("");
  }

  if (!props.listId) {
    return (
      <>
        <p>Invalid list id: {props.listId}</p>
      </>
    );
  }

  if (!items) {
    return <p>Wait</p>;
  }

  const itemDisplays = items.map((i) => (
    <ItemDetails key={i.itemId} itemInfo={i} />
  ));

  return (
    <>
      <Grid stackable columns={2} verticalAlign="middle">
        <Grid.Column>
          <TextAreaAutosize
            value={listName}
            onValueChange={(newValue) => {
              setListName(newValue);
            }}
            onFocus={() => {}}
            onBlur={() => {
              db.lists.update(props.listId, { listName: listName });
            }}
            fontSize="2rem"
          />
        </Grid.Column>
        <Grid.Column>
          <ListActions list={list} />
        </Grid.Column>
      </Grid>

      <Form
        onSubmit={() => addItem()}
        style={{ margin: "20px", maxWidth: "500px" }}
      >
        <Form.Input
          value={newItemName}
          onChange={(ev) => setNewItemName(ev.target.value)}
          action={<Button color="teal">Add Item</Button>}
        />
      </Form>
      <table style={{ width: "100%" }}>
        <tbody style={{ width: "100%" }}>{itemDisplays}</tbody>
      </table>
    </>
  );
}
