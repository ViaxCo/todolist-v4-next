import { IconButton, useColorMode, IconButtonProps } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { motion, HTMLMotionProps, useCycle } from "framer-motion";

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionButtonProps = Merge<IconButtonProps, HTMLMotionProps<"button">>;
const MotionIconButton: React.FC<MotionButtonProps> = motion(IconButton);

const ColorModeButton = () => {
  // useColorMode for color mode check and toggle
  const { colorMode, toggleColorMode } = useColorMode();
  // useCycle to cycle between different animation states
  const [animate, cycle] = useCycle({ rotate: 0 }, { rotate: 360 });
  return (
    <MotionIconButton
      aria-label="Toggle Dark and Light"
      variant="ghost"
      borderRadius="50%"
      colorScheme="viaxco"
      onClick={toggleColorMode}
      animate={animate}
      onTap={() => cycle()}
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    />
  );
};

export default ColorModeButton;
