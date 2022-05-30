//
import { useRouter } from "next/router";
import ListDisplay from "../components/ListDisplay";
import Navbar from "../components/Navbar";

//
export default function ListDetail() {
  const router = useRouter();

  const listId = router.query.listId;

  return (
    <>
      <Navbar />

      <ListDisplay listId={listId} />
    </>
  );
}

ListDetail.requiresAuthentication = true;
