import { AppProps } from "next/app";
import Head from "next/head";
import { GoogleFonts } from "next-google-fonts";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
// Remove blue outline from buttons and links
import "focus-visible/dist/focus-visible";

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
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ChakraProvider>
    </>
  );
};

export default MyApp;
