import { useAppDispatch } from "../redux/hooks";
import { addItem, setListIsLoading } from "../redux/features/items/itemsSlice";
import { addList } from "../redux/features/lists/listsSlice";
import { ChangeEvent, FormEvent, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  IconButton,
  Input,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";

type Props = {
  customListName?: string;
};

const AddNewListOrItem = ({ customListName }: Props) => {
  const [value, setValue] = useState("");
  const [adding, setAdding] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // If on the home page
    if (!customListName) {
      dispatch(setListIsLoading(true));
      dispatch(addList(value));
    }
    // If on the individual lists page
    if (customListName) {
      setAdding(true);
      setValue("");
      await dispatch(addItem({ customListName, name: value }));
      setAdding(false);
    }
  };

  return (
    <Flex
      as="form"
      method="post"
      onSubmit={handleSubmit}
      align="center"
      minH="70px"
      ml="10px"
    >
      <FormControl>
        <Input
          textAlign="center"
          height="50px"
          w={{ base: "80%", md: "85%" }}
          border="none"
          borderRadius="0"
          bg="transparent"
          fontSize="1.2rem"
          fontWeight="400"
          color={useColorModeValue("main.blue", "white")}
          name="text"
          type="text"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          isRequired={true}
          autoComplete="off"
          placeholder={customListName ? "New Item" : "New List"}
          _focus={{
            outline: "none",
            boxShadow: useColorModeValue(
              "inset 0 -2.5px 0 0 #32469b",
              "inset 0 -2.5px 0 0 #9eabe3"
            ),
          }}
          _placeholder={{
            color: useColorModeValue("grey", "viaxco.300"),
            opacity: 1,
          }}
        />
        <IconButton
          type="submit"
          aria-label={customListName ? "Add Item" : "Add List"}
          borderRadius="50%"
          minW="50px"
          minH="50px"
          colorScheme="viaxco"
          icon={adding ? <Spinner /> : <AddIcon />}
          disabled={adding}
        />
      </FormControl>
    </Flex>
  );
};

export default AddNewListOrItem;
