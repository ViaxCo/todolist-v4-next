import { extendTheme } from "@chakra-ui/react";

// Global style overrides
import styles from "./styles";

// Foundational style overrides
import colors from "./foundations/colors";
import breakpoints from "./foundations/breakpoints";

const overrides = {
  styles,
  colors,
  breakpoints,
  fonts: {
    heading: "'Montserrat', sans-serif",
    body: "'Montserrat', sans-serif",
  },
  initialColorMode: "light" as const,
  useSystemColorMode: false,
};

export default extendTheme(overrides);
