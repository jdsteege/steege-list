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
      {itemInfo.isComplete ? (
        <strike style={{ color: "#aaa" }}>{itemInfo.label}</strike>
      ) : (
        itemInfo.label
      )}
      <Divider fitted />
    </List.Item>
  ));

  return (
    <Segment
      compact
      style={{ minWidth: "150px", maxWidth: "360px", minHeight: "150" }}
    >
      <Link href={"/list-detail?listId=" + props.listInfo.listId} passHref>
        <a>
          <Header as="h3">
            <u>{props.listInfo.listName}</u>
          </Header>
        </a>
      </Link>
      <List>{itemNames}</List>
    </Segment>
  );
}
