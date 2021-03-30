import { AppProps } from "next/app";
import Head from "next/head";
import { GoogleFonts } from "next-google-fonts";
import { SWRConfig } from "swr";
import { ChakraProvider, useToast } from "@chakra-ui/react";
import theme from "../theme";
// Remove blue outline from buttons and links
import "focus-visible/dist/focus-visible";
import axios from "axios";
import { ReactNode } from "react";

const SwrWrapper = ({ children }: { children: ReactNode }) => {
  const toast = useToast();
  const onError = (error: any, key: string) => {
    if (error.status !== 403 && error.status !== 404) {
      toast({
        title: "An error occurred",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
    }
  };
  const fetcher = async (url: string) => {
    const res = await axios.get(url);
    return res.data;
  };
  return (
    <SWRConfig value={{ onError, fetcher, revalidateOnFocus: false }}>
      {children}
    </SWRConfig>
  );
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Todo List app" />

        <title>Todo List</title>
      </Head>
      <ChakraProvider theme={theme}>
        <SwrWrapper>
          <Component {...pageProps} />
        </SwrWrapper>
      </ChakraProvider>
    </>
  );
};

export default MyApp;
