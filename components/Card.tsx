import { useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AddNewListOrItem from "./AddNewListOrItem";
import { AnimatePresence } from "framer-motion";
import MyBox from "./MyBox";
import SmallCard from "./SmallCard";
import Spinner from "./Spinner";
import { ItemData, ListData } from "../types";
import useLists from "../hooks/useLists";
import useItems from "../hooks/useItems";

type Props = {
  customListName?: string;
};

const Card = ({ customListName }: Props) => {
  const { data: listData } = useLists<ListData>();
  const { data: itemData } = useItems<ItemData>(customListName);
  const lists = listData?.lists;
  const items = itemData?.items;

  const { pathname } = useRouter();
  // Custom css value depending on the color mode
  // useColorModeValue("light", "dark")
  const boxShadow = useColorModeValue(
    "5px 5px 15px -5px rgba(0, 0, 0, 0.5)",
    "5px 5px 15px -5px rgba(4,16,68,0.5)"
  );
  return (
    <MyBox boxShadow={boxShadow} bg={useColorModeValue("white", "viaxco.500")}>
      {pathname === "/" ? (
        !listData ? (
          <Spinner />
        ) : (
          <AnimatePresence>
            {lists?.map((list, i) => (
              <SmallCard key={list._id} list={list} i={i} />
            ))}
          </AnimatePresence>
        )
      ) : !itemData ? (
        <Spinner />
      ) : (
        <AnimatePresence>
          {items?.map((item, i) => (
            <SmallCard key={item._id} item={item} i={i} customListName={customListName} />
          ))}
        </AnimatePresence>
      )}
      <AddNewListOrItem customListName={customListName} />
    </MyBox>
  );
};

export default Card;
