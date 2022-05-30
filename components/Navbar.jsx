import { useRouter } from "next/router";
import React from "react";
import { Menu } from "semantic-ui-react";
import SignOutButton from "./SignOutButton";

//
export default function Navbar({}) {
  const router = useRouter();

  return (
    <>
      <Menu fixed="top">
        <Menu.Item name="Back" onClick={() => router.back()} />

        <Menu.Menu position="right">
          <Menu.Item>
            <SignOutButton />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <div style={{ height: "4rem" }} />
    </>
  );
}
