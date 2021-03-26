import { useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

type Props = {
  className: string;
};

const Blender = ({ className }: Props) => {
  return (
    <motion.div
      className={`blender ${className}`}
      variants={{
        light: {
          transform: "scale(0)",
          opacity: 0.5,
          transition: { ease: "easeInOut", duration: 0.4 },
        },
        dark: {
          transform: "scale(60)",
          opacity: 0,
          transition: { ease: "easeInOut", duration: 0.6 },
        },
      }}
      initial={{ opacity: 0, transform: "scale(0)" }}
      animate={useColorModeValue("light", "dark")}
    />
  );
};

export default Blender;
