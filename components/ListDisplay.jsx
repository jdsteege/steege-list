//
import React, { useEffect } from "react";
import useSWR from "swr";
import Link from "next/link";

//
const swrFetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ListCollection() {
  const { data: listData, error: itemsError } = useSWR(
    "/api/get-list",
    swrFetcher
  );

  if (!listData) {
    return <p>Wait...</p>;
  }

  const itemNames = listData.items.map((itemInfo) => (
    <li key={itemInfo.label}>{itemInfo.label}</li>
  ));

  return (
    <>
      <Link href="/dashboard">
        <a>&lt; Back</a>
      </Link>
      <p>{listData.listName}</p>
      <ul>{itemNames}</ul>
    </>
  );
}
