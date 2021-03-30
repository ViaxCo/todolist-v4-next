import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import MyBox from "./MyBox";

const Footer = () => {
  const { pathname } = useRouter();
  return (
    <MyBox
      as="footer"
      boxShadow="5px 5px 15px -5px rgba(0, 0, 0, 0.3)"
      bg="main.blue"
      color="white"
      w="fit-content"
      textAlign="center"
      mt={{ md: "150px" }}
      p="10px"
    >
      &copy; Created by{" "}
      {pathname === "/about" ? (
        <NextLink href="/" passHref>
          <Link textDecoration="underline">ViaxCo</Link>
        </NextLink>
      ) : (
        <NextLink href="/about" passHref>
          <Link textDecor="underline">ViaxCo</Link>
        </NextLink>
      )}
    </MyBox>
  );
};

export default Footer;
