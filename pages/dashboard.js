//
import ListCollection from "../components/ListCollection";
import Navbar from "../components/Navbar";

//
export default function Dashboard(props) {
  return (
    <>
      <Navbar />
      <ListCollection />
    </>
  );
}

Dashboard.requiresAuthentication = true;
