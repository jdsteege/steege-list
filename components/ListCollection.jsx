//
import React, { useEffect } from "react";
import useSWR from "swr";
import Link from "next/link";

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

  const listNames = allListData.lists.map((listInfo) => (
    <li key={listInfo.listName}>
      <Link href="/list-detail" passHref>
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
