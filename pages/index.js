//
import "semantic-ui-css/semantic.min.css";
import Head from "next/head";

//
import useSWR from "swr";
import {
  Container,
  Button,
  Header,
  Input,
  List,
  Checkbox,
} from "semantic-ui-react";

//
const fetcher = (...args) => fetch(...args).then((res) => res.json());

//
function useAPI(url) {
  const { data, error } = useSWR(url, fetcher);

  return {
    rawdata: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function UserTest() {
  const { rawdata, isLoading, isError } = useAPI(`/api/hello`);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  return <p>{rawdata.name}</p>;
}

function ListAPITest() {
  const { rawdata, isLoading, isError } = useAPI(`/api/list`);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;
  if (!rawdata) return <p>Wait...</p>;

  const textlist = (
    <List>
      {rawdata.items.map((item) => (
        <List.Item key={item.label}>
          <Checkbox label={item.label}></Checkbox>
        </List.Item>
      ))}
    </List>
  );
  return textlist;
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Steege List</title>
        <meta name="description" content="A list app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Header textAlign="center">Welcome to SteegeList!</Header>

        <Input name="username" placeholder="username"></Input>
        <Button>Login-ish</Button>

        <List bulleted>
          <List.Item>Apples</List.Item>
          <List.Item>Bananas</List.Item>
          <List.Item>Cucumbers</List.Item>
          <List.Item>Donuts</List.Item>
          <List.Item>Eggs</List.Item>
        </List>

        <UserTest />
        <ListAPITest />
      </Container>
    </div>
  );
}
