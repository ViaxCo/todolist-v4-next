import { useColorModeValue } from "@chakra-ui/color-mode";
import { Flex } from "@chakra-ui/layout";
import { Spinner as ChakraSpinner } from "@chakra-ui/spinner";

const Spinner = () => {
  return (
    <Flex padding="10">
      <ChakraSpinner
        color={useColorModeValue("main.blue", "viaxco.50")}
        size="lg"
        thickness="3px"
        margin="auto"
      />
    </Flex>
  );
};

export default Spinner;
