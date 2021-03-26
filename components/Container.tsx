import { Box } from "@chakra-ui/layout";
import { ReactNode } from "react";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <Box position="relative" overflow="hidden" minH={{ base: "100vh", md: "1000px" }}>
      {children}
      <Footer />
    </Box>
  );
};

export default Container;
