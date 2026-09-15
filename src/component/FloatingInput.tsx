import { Box, Input, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import type { FloatingInputProps } from "../utils/types";

const FloatingInput = ({
  label,
  error,
  type,
  ...props
}: FloatingInputProps) => {
  const inputBg = useColorModeValue("gray.100", "gray.800");
  const inputColor = useColorModeValue("gray.900", "white");
  const labelColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Box>
      <Box position="relative" h="52px" w="full">
        <Input
          {...props}
          type={type}
          placeholder=" "
          bg={inputBg}
          color={inputColor}
          border="none"
          rounded="xl"
          h="52px"
          pt="22px"
          pb="6px"
          fontSize="md"
          _focus={{
            bg: inputBg,
            boxShadow: "0 0 0 2px var(--chakra-colors-purple-500)",
          }}
          css={{
            "&:focus + label, &:not(:placeholder-shown) + label": {
              transform: "translateY(-20px) scale(0.75)",
              fontSize: "0.8rem",
            },
          }}
        />
        <Text
          as="label"
          position="absolute"
          left="16px"
          top="50%"
          transform="translateY(-50%)"
          color={labelColor}
          fontSize="md"
          pointerEvents="none"
          transition="all 0.15s ease"
          transformOrigin="left top"
        >
          {label}
        </Text>
      </Box>

      <Text
        color="red.500"
        fontSize="xs"
        my={1}
        minH="16px"
        visibility={error ? "visible" : "hidden"}
      >
        {error || " "}
      </Text>
    </Box>
  );
};

export default FloatingInput;
