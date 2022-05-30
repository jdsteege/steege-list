//
import { useLiveQuery } from "dexie-react-hooks";
import { Grid, GridColumn } from "semantic-ui-react";
//
import { db } from "../js/dexie-db";
import CreateNewList from "./CreateNewList";
import ListSummary from "./ListSummary";

//
export default function ListCollection(props) {
  const lists = useLiveQuery(() => db.lists.toCollection().sortBy("sortPos"));

  function nextSortPos() {
    if (!lists || lists.length <= 0) {
      return 0;
    }

    return lists[lists.length - 1].sortPos + 1;
  }

  if (!lists) {
    return <p>Wait</p>;
  }

  const summaries = lists.map((listInfo) => (
    // <div key={listInfo.listId}>
    <GridColumn key={listInfo.listId}>
      <ListSummary listInfo={listInfo} />
    </GridColumn>
    // </div>
  ));

  return (
    <>
      <CreateNewList nextSortPos={nextSortPos()} />

      {/* <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}> */}
      <Grid centered doubling stackable columns={4}>
        {summaries}
      </Grid>
      {/* </div> */}
    </>
  );
}
