import { useAppSelector } from "../redux/hooks";
import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import MyBox from "./MyBox";

const Header = () => {
  const today = useAppSelector(state => state.lists.today);
  const listTitle = useAppSelector(state => state.items.listTitle);
  const listIsLoading = useAppSelector(state => state.items.listIsLoading);

  const { pathname } = useRouter();

  return (
    <MyBox
      boxShadow="3px 3px 5px 0px rgba(4,16,68,0.5)"
      bg="main.blue"
      textAlign="center"
    >
      <Heading as="h1" color="white" p="10px">
        {pathname === "/" ? today : listIsLoading ? today : listTitle}
      </Heading>
    </MyBox>
  );
};

export default Header;
