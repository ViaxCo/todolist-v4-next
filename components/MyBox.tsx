import { Box, BoxProps } from "@chakra-ui/layout";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MyBox = ({ children, ...props }: Props & BoxProps) => {
  return (
    <Box
      maxW={{ base: "320px", md: "400px" }}
      m="50px auto"
      borderRadius="5px"
      {...props}
    >
      {children}
    </Box>
  );
};

export default MyBox;
