//
import React, { useEffect } from "react";
import useSWR from "swr";
import Link from "next/link";
import { Loader } from "semantic-ui-react";

//
const swrFetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ListCollection(props) {
  const { data: allListData, error: allListError } = useSWR(
    `/api/get-user-lists`,
    swrFetcher
  );

  if (!allListData) {
    return <Loader active />;
  }

  const listNames = allListData.map((listInfo) => (
    <li key={listInfo.listName}>
      <Link href={"/list-detail?listId=" + listInfo.listId} passHref>
        <a>{listInfo.listName}</a>
      </Link>
    </li>
  ));

  return (
    <>
      <ul>{listNames}</ul>
    </>
  );
}
