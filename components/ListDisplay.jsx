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
  Divider,
  Header,
  Grid,
  Container,
  Label,
} from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
//
import { db } from "../js/dexie-db";
import ListActions from "./ListActions";

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

  const completed = (id, isChecked) => {
    console.log("completed ", id, " to ", isChecked);
    db.items.update(id, { isComplete: isChecked });
  };

  const itemNames = items.map((itemInfo) => (
    <List.Item key={itemInfo.itemId}>
      <table>
        <tbody>
          <tr style={{ verticalAlign: "middle" }}>
            <td
              onClick={() => completed(itemInfo.itemId, !itemInfo.isComplete)}
              style={{ padding: "5px" }}
            >
              <Checkbox
                checked={itemInfo.isComplete}
                // onChange={(event, data) =>
                //   completed(itemInfo.itemId, data.checked)
                // }
              />
            </td>
            {itemInfo.isComplete ? (
              <td style={{ color: "#aaa" }}>{itemInfo.label}</td>
            ) : (
              <td>{itemInfo.label}</td>
            )}
          </tr>
        </tbody>
      </table>
      <Divider fitted />
    </List.Item>
  ));

  // const itemNames = items.map((itemInfo) => (
  //   <List.Item key={itemInfo.itemId}>
  //     <div style={{ display: "flex" }}>
  //       <Checkbox
  //         checked={itemInfo.isComplete}
  //         onChange={(event, data) => completed(itemInfo.itemId, data.checked)}
  //         style={{ paddingBottom: "6px", margin: "6px" }}
  //       />
  //       <div>{itemInfo.label}</div>
  //     </div>
  //     <Divider fitted />
  //   </List.Item>
  // ));

  return (
    <>
      <Grid stackable columns={2} verticalAlign="middle">
        <Grid.Column>
          <Header as="h1">{list?.listName}</Header>
        </Grid.Column>
        <Grid.Column>
          <ListActions list={list} />
        </Grid.Column>
      </Grid>

      <Form onSubmit={() => addItem()} style={{ margin: "20px" }}>
        <Form.Input
          value={newItemName}
          onChange={(ev) => setNewItemName(ev.target.value)}
          action={<Button color="teal">Add Item</Button>}
        />
      </Form>
      <List>{itemNames}</List>
    </>
  );
}
