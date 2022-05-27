//

import Link from "next/link";
import ListCollection from "../components/ListCollection";
import SignOutButton from "../components/SignOutButton";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

//
export default function Dashboard(props) {
  return (
    <>
      <Navbar />
      <Box mt="6rem">
        <ListCollection />
      </Box>
    </>
  );
}

Dashboard.requiresAuthentication = true;
