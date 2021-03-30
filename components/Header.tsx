import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { getDay } from "../utils/date";
import MyBox from "./MyBox";
import { ItemData } from "../types";
import useItems from "../hooks/useItems";

type Props = {
  customListName?: string;
};

const Header = ({ customListName }: Props) => {
  const today = getDay();
  const { pathname } = useRouter();

  const { data: itemData } = useItems<ItemData>(customListName);
  const listTitle = itemData?.listTitle;

  return (
    <MyBox
      boxShadow="3px 3px 5px 0px rgba(4,16,68,0.5)"
      bg="main.blue"
      textAlign="center"
    >
      <Heading as="h1" color="white" p="10px">
        {pathname === "/" ? today : listTitle ?? today}
      </Heading>
    </MyBox>
  );
};

export default Header;
