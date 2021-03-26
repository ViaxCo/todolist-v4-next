import { useAppDispatch } from "../redux/hooks";
import { deleteList, ListType } from "../redux/features/lists/listsSlice";
import {
  deleteItem,
  ItemType,
  setListIsLoading,
  toggleItemCompleted,
} from "../redux/features/items/itemsSlice";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Checkbox,
  Flex,
  FlexProps,
  IconButton,
  Link,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { HTMLMotionProps, motion } from "framer-motion";
import { useState } from "react";
import NextLink from "next/link";

type Props = {
  list?: ListType;
  item?: ItemType;
  i: number;
  customListName?: string;
};

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionFlexProps = Merge<FlexProps, HTMLMotionProps<"div">>;
const MotionFlex: React.FC<MotionFlexProps> = motion(Flex);

const SmallCard = ({ list, item, i, customListName }: Props) => {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(item?.completed);

  const List = () => (
    <NextLink href={{ pathname: `/${list?.name}` }} passHref>
      <Link
        flex="1"
        textAlign="center"
        borderRadius="5px"
        onClick={() => dispatch(setListIsLoading(true))}
      >
        <Text
          p="20px"
          fontSize="1.2rem"
          fontWeight={400}
          color={useColorModeValue("main.blue", "white")}
        >
          {list?.name}
        </Text>
      </Link>
    </NextLink>
  );

  const Item = () => (
    <Checkbox
      flex="1"
      colorScheme="viaxco"
      p="20px"
      size="lg"
      spacing="2rem"
      fontWeight="400"
      color={useColorModeValue("main.blue", "white")}
      isChecked={checked}
      onChange={() => {
        setChecked(!checked);
        dispatch(toggleItemCompleted(customListName!, item?._id!, i, !checked));
      }}
      textDecoration={checked ? "line-through" : undefined}
    >
      {item?.task}
    </Checkbox>
  );

  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        stiffness: 600,
        damping: 30,
      }}
    >
      <MotionFlex
        align="center"
        minH="70px"
        borderBottom="1px solid"
        borderColor={useColorModeValue("#f1f1f1", "viaxco.400")}
        // Mount and exit animations of each card
        opacity="0"
        variants={{
          hidden: (i: number) => ({ opacity: 0, y: -50 * i }),
          visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
              delay: i * 0.025,
            },
          }),
          exit: {
            opacity: 0,
            x: -50,
          },
        }}
        initial="hidden"
        animate="visible"
        exit="exit"
        custom={i}
      >
        <Box
          w={{ base: "82%", md: "83%" }}
          cursor="pointer"
          display="flex"
          alignItems="center"
        >
          {list ? <List /> : <Item />}
        </Box>
        <IconButton
          m="auto"
          aria-label={list ? "Delete List" : "Delete Item"}
          variant="ghost"
          size={useBreakpointValue({ base: "sm", md: "md" })}
          colorScheme="red"
          onClick={() =>
            list
              ? dispatch(deleteList(list._id!))
              : dispatch(deleteItem(customListName!, item?._id!))
          }
          icon={<DeleteIcon />}
        />
      </MotionFlex>
    </motion.div>
  );
};

export default SmallCard;
