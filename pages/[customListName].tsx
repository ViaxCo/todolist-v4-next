import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getItems } from "../redux/features/items/itemsSlice";
import { setHomeIsLoading } from "../redux/features/lists/listsSlice";
import Header from "../components/Header";
import HeaderTwo from "../components/HeaderTwo";
import Card from "../components/Card";
import { Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Head from "next/head";
import Container from "../components/Container";

const List = () => {
  // Get the url parameter (/:customListName) value
  const { query } = useRouter();
  const customListName = query.customListName as string;

  const dispatch = useAppDispatch();
  const { listIsLoading, listTitle } = useAppSelector(state => state.items);

  useEffect(() => {
    if (customListName) dispatch(getItems(customListName));
  }, [dispatch, customListName]);
  return (
    <>
      <Head>
        <title>{listIsLoading ? "Todo List" : listTitle}</title>
      </Head>

      <Container>
        <NextLink href="/" passHref>
          <Link
            style={{ textDecoration: "none" }}
            onClick={() => dispatch(setHomeIsLoading(true))}
          >
            <Header />
          </Link>
        </NextLink>
        <HeaderTwo />
        <Card customListName={customListName} />
      </Container>
    </>
  );
};

export default List;
