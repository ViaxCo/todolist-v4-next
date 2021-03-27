import { Box, Divider, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import ColorModeButton from "../components/ColorModeButton";
import Image from "next/image";
import MyBox from "../components/MyBox";
import Container from "../components/Container";
import Blender from "../components/Blender";

const About = () => {
  return (
    <Container>
      <MyBox
        bg={useColorModeValue("white", "main.blue")}
        boxShadow="5px 5px 15px -5px rgba(0, 0, 0, 0.5)"
        textAlign="center"
        display="flex"
        flexDir="column"
        alignItems="center"
      >
        <Heading
          as="h1"
          color={useColorModeValue("main.blue", "white")}
          p="10px"
          fontSize={{ base: "1.5rem", md: "2rem" }}
        >
          About Page.
        </Heading>
        <Divider
          border="none"
          bgColor={useColorModeValue("main.blue", "white")}
          height="2px"
          w="70%"
          m="auto"
          mb="4"
        />
        <ColorModeButton />
        <Blender className="about" />
        <Box mt="30px">
          <Image src="/avatar.png" alt="Avatar" width={200} height={200} />
        </Box>
        <Text
          p="20px"
          fontSize="1.2rem"
          fontWeight="400"
          color={useColorModeValue("main.blue", "white")}
        >
          I am a Software Engineer.
        </Text>
      </MyBox>
    </Container>
  );
};

export default About;
