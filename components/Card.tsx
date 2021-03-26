import { useColorModeValue } from "@chakra-ui/react";
import { useAppSelector } from "../redux/hooks";
import AddNewListOrItem from "./AddNewListOrItem";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import MyBox from "./MyBox";
import SmallCard from "./SmallCard";
import Spinner from "./Spinner";

type Props = {
  customListName?: string;
};

const Card = ({ customListName }: Props) => {
  const lists = useAppSelector(state => state.lists.lists);
  const items = useAppSelector(state => state.items.items);
  const homeIsLoading = useAppSelector(state => state.lists.homeIsLoading);
  const listIsLoading = useAppSelector(state => state.items.listIsLoading);

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
        homeIsLoading ? (
          <Spinner />
        ) : (
          <AnimatePresence>
            {lists.map((list, i) => (
              <SmallCard key={list._id} list={list} i={i} />
            ))}
          </AnimatePresence>
        )
      ) : listIsLoading ? (
        <Spinner />
      ) : (
        <AnimatePresence>
          {items.map((item, i) => (
            <SmallCard key={item._id} item={item} i={i} customListName={customListName} />
          ))}
        </AnimatePresence>
      )}
      <AddNewListOrItem customListName={customListName} />
    </MyBox>
  );
};

export default Card;
