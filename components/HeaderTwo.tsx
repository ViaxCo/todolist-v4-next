import { Box, Heading, HStack, useColorModeValue } from "@chakra-ui/react";
import ColorModeButton from "./ColorModeButton";
import Blender from "./Blender";
import { useRouter } from "next/router";

const HeaderTwo = () => {
  const { pathname } = useRouter();
  // Custom css value depending on the color mode
  // useColorModeValue("light", "dark")
  const boxShadow = useColorModeValue(
    "4px 4px 8px -2px rgba(0, 0, 0, 0.3)",
    "4px 4px 8px -2px rgba(4,16,68,0.5)"
  );

  return (
    <Box
      m="-10px auto -20px auto"
      borderRadius="5px"
      boxShadow={boxShadow}
      bg={useColorModeValue("white", "main.blue")}
      textAlign="center"
      p="10px 20px 10px 20px"
      w="fit-content"
    >
      <HStack spacing={4}>
        <Heading color={useColorModeValue("main.blue", "white")} fontSize="1.5rem">
          Your {pathname === "/" ? "Lists" : "Items"}
        </Heading>
        <ColorModeButton />
        <Blender className="main" />
      </HStack>
    </Box>
  );
};

export default HeaderTwo;
