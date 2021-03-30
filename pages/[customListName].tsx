import axios from "axios";
import { mutate } from "swr";
import { Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Head from "next/head";
import Header from "../components/Header";
import HeaderTwo from "../components/HeaderTwo";
import Card from "../components/Card";
import Container from "../components/Container";
import { ItemData } from "../types";
import { useEffect } from "react";
import useItems from "../hooks/useItems";

const List = () => {
  // Get the url parameter (/:customListName) value
  const { query } = useRouter();
  const customListName = query.customListName as string | undefined;

  const { data: itemData } = useItems<ItemData>(customListName);
  const listTitle = itemData?.listTitle;

  useEffect(() => {
    mutate(
      "/api",
      axios.get("/api").then(res => res.data)
    );
  }, []);

  return (
    <>
      <Head>
        <title>{listTitle ?? "Todo List"}</title>
      </Head>

      <Container>
        <NextLink href="/" passHref>
          <Link style={{ textDecoration: "none" }}>
            <Header customListName={customListName} />
          </Link>
        </NextLink>
        <HeaderTwo />
        <Card customListName={customListName} />
      </Container>
    </>
  );
};

export default List;
