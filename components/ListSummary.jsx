//
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import Link from "next/link";
import {
  Button,
  Checkbox,
  Input,
  List,
  Segment,
  Form,
  Header,
  Modal,
  Confirm,
} from "semantic-ui-react";

//
import { db } from "../js/dexie-db";

//
export default function ListSummary(props) {
  let items = useLiveQuery(() =>
    db.items.where("itemListId").equals(props.listInfo.listId).sortBy("sortPos")
  );
  items = items?.slice(0, 10);

  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  //
  if (!props.listInfo.listId) {
    return (
      <>
        <p>Invalid list id: {props.listInfo.listId}</p>
      </>
    );
  }

  if (!items) {
    return <p>Wait</p>;
  }
  const itemNames = items.map((itemInfo) => (
    <List.Item key={itemInfo.itemId}>
      <Checkbox
        readOnly
        checked={itemInfo.isComplete}
        onChange={(event, data) => completed(itemInfo.itemId, data.checked)}
        label={itemInfo.label}
      />
    </List.Item>
  ));

  const handleDeleteList = () => {
    db.lists.delete(props.listInfo.listId);
    setConfirmDeleteVisible(false);
  };

  return (
    <Segment compact style={{ minWidth: 150, maxWidth: 250, minHeight: 250 }}>
      <Link href={"/list-detail?listId=" + props.listInfo.listId} passHref>
        <a>
          <Header as="h3">
            <u>{props.listInfo.listName}</u>
          </Header>
        </a>
      </Link>
      <List>{itemNames}</List>
      <div style={{ minHeight: 20 }}>
        <Button
          compact
          size="mini"
          color="orange"
          className="delete-button"
          onClick={() => setConfirmDeleteVisible(true)}
        >
          Delete
        </Button>
      </div>
      <Confirm
        open={confirmDeleteVisible}
        header="Confirm list delete"
        content={
          'This will delete "' +
          props.listInfo.listName +
          '" and all its items.'
        }
        cancelButton="Cancel"
        confirmButton="Delete"
        onCancel={() => setConfirmDeleteVisible(false)}
        onConfirm={handleDeleteList}
      />
    </Segment>
  );
}
