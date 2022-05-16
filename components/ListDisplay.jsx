//
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  List,
  Segment,
  Form,
} from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
//
import { db } from "../js/dexie-db";

//
export default function ListDisplay(props) {
  const [newItemName, setNewItemName] = useState("");

  const list = useLiveQuery(() =>
    db.lists.where("listId").equals(props.listId).first()
  );
  const items = useLiveQuery(() =>
    db.items.where("itemListId").equals(props.listId).sortBy("sortPos")
  );

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
    return (
      // <>
      //   <Dimmer active>
      //     <Loader />
      //   </Dimmer>
      // </>
      <p>Wait</p>
    );
  }

  // const currentList = allListData.find((l) => l.listId == props.listId);

  // if (!props.listId) {
  //   return (
  //     <>
  //       <p>Invalid list id: {props.listId}</p>
  //     </>
  //   );
  // }

  // const labelChanged = (id, label) => {
  //   console.log("changed ", id, " to ", label);
  // };

  const completed = (id, isComplete) => {
    console.log("completed ", id, " to ", isComplete);
  };

  const itemNames = items.map((itemInfo) => (
    <List.Item key={itemInfo.itemId}>
      <Checkbox
        onChange={(event, data) => completed(itemInfo.itemId, data.checked)}
        label={itemInfo.label}
      />
      {/* <input
        defaultValue={itemInfo.label}
        className="list-item"
        onChange={(event) => labelChanged(itemInfo.itemId, event.target.value)}
      /> */}
    </List.Item>
  ));

  return (
    <>
      <p>{list?.listName}</p>

      <Segment>
        <Form onSubmit={() => addItem()}>
          <Input
            value={newItemName}
            onChange={(ev) => setNewItemName(ev.target.value)}
            action={<Button>Add Item</Button>}
          />
        </Form>
      </Segment>
      <List>{itemNames}</List>
    </>
  );
}
