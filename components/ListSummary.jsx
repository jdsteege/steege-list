/* eslint-disable @next/next/link-passhref */
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
  const limit = 6;
  const moreThanLimit = items?.length > limit;
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
      <div
        style={
          itemInfo.isComplete
            ? { color: "#aaa", textDecoration: "line-through" }
            : { color: "#000" }
        }
      >
        {itemInfo.label}
      </div>
      <Divider fitted />
    </List.Item>
  ));

  return (
    <Link href={"/list-detail?listId=" + props.listInfo.listId}>
      <div>
        <Segment
          compact
          style={{ minWidth: "150px", maxWidth: "360px", minHeight: "180px" }}
        >
          <Header as="h3">
            <u>{props.listInfo.listName}</u>
          </Header>
          <List>
            {itemNames}
            {moreThanLimit ? <List.Item>. . .</List.Item> : <></>}
          </List>
        </Segment>
      </div>
    </Link>
  );
}
