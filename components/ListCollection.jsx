//
import { useLiveQuery } from "dexie-react-hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Input, Segment, Form } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
//
import { db } from "../js/dexie-db";
import ListDisplay from "./ListDisplay";
import ListSummary from "./ListSummary";

//
export default function ListCollection(props) {
  const lists = useLiveQuery(() => db.lists.toCollection().sortBy("sortPos"));
  const [newListName, setNewListName] = useState("");
  const router = useRouter();

  function nextSortPos() {
    if (!lists || lists.length <= 0) {
      return 0;
    }

    return lists[lists.length - 1].sortPos + 1;
  }

  async function addList() {
    if (!newListName) return;
    const newListId = await db.lists.add({
      listId: uuidv4(),
      listName: newListName,
      sortPos: nextSortPos(),
    });

    setNewListName("");
    router.push("/list-detail?listId=" + newListId);
  }

  if (!lists) {
    return (
      // <Dimmer active>
      //   <Loader />
      // </Dimmer>
      <p>Wait</p>
    );
  }

  //
  // const listNames = lists.map((listInfo) => (
  //   <li key={listInfo.listId}>
  //     <Link href={"/list-detail?listId=" + listInfo.listId} passHref>
  //       <a>{listInfo.listName}</a>
  //     </Link>
  //   </li>
  // ));

  const summaries = lists.map((listInfo) => (
    <ListSummary key={listInfo.listId} listInfo={listInfo} />
  ));

  return (
    <>
      <Form onSubmit={() => addList()} style={{ margin: "20px" }}>
        <Form.Input
          value={newListName}
          onChange={(ev) => setNewListName(ev.target.value)}
          action={<Button color="teal">Add List</Button>}
        />
      </Form>
      {/* <ul>{listNames}</ul> */}
      <div className="flex-box">{summaries}</div>
    </>
  );
}
