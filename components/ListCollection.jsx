//
import React, { useEffect } from "react";
import useSWR from "swr";

//
const swrFetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ListCollection() {
  const { data: allListData, error: allListError } = useSWR(
    "/api/get-all-lists",
    swrFetcher
  );

  if (!allListData) {
    return <p>Wait...</p>;
  }

  console.log(`allListData ` + JSON.stringify(allListData));
  console.log(`allListError ` + JSON.stringify(allListError));

  let result = ``;
  const listNames = allListData.lists.map((listInfo) => (
    <li key={listInfo.listName}>{listInfo.listName}</li>
  ));

  return (
    <>
      <p>test</p>
      <ul>{listNames}</ul>
    </>
  );
}
