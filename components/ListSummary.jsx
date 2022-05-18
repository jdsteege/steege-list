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
  Divider,
} from "semantic-ui-react";

//
import { db } from "../js/dexie-db";

//
export default function ListSummary(props) {
  let items = useLiveQuery(() =>
    db.items.where("itemListId").equals(props.listInfo.listId).sortBy("sortPos")
  );
  items = items?.slice(0, 6);

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
      <itemlabel
        style={
          itemInfo.isComplete
            ? { color: "#aaa", textDecoration: "line-through" }
            : { color: "#000" }
        }
      >
        {itemInfo.label}
      </itemlabel>
      <Divider fitted />
    </List.Item>
  ));

  return (
    <Link href={"/list-detail?listId=" + props.listInfo.listId} passHref>
      <Segment
        compact
        style={{ minWidth: "150px", maxWidth: "360px", minHeight: "150" }}
      >
        <Header as="h3">
          <u>{props.listInfo.listName}</u>
        </Header>
        <List>{itemNames}</List>
      </Segment>
    </Link>
  );
}
