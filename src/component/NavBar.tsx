import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";
import { FaRegMoon } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineWbSunny } from "react-icons/md";
import { Link } from "react-router-dom";
import { useColorMode, useColorModeValue } from "../components/ui/color-mode";
import { useCartStore } from "../store/cart-store";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const borderColor = useColorModeValue("gray.200", "gray.800");
  const bg = useColorModeValue("white", "gray.900");
  const nameColor = useColorModeValue("gray.900", "white");
  const items = useCartStore((state) => state.items);
  return (
    <Box
      as="nav"
      bg={bg}
      borderBottom="1px solid"
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Container maxW={"1140px"} py={3}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Link to={"/"}>
            <HStack>
              <Box
                w={8}
                h={8}
                rounded={"lg"}
                bg={"purple.500"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                color={"white"}
                fontWeight={"bold"}
                fontSize={"sm"}
              >
                P
              </Box>
              <Text
                fontSize={{ base: "sm", md: "xl" }}
                fontWeight={"bold"}
                lineHeight={"shorter"}
                letterSpacing={"tight"}
                color={nameColor}
              >
                Product <Box as="br" display={{ base: "block", md: "none" }} />
                Store
              </Text>
            </HStack>
          </Link>

          <HStack gap={2}>
            <Link to={"/cart"}>
              <Button
                variant={"ghost"}
                rounded={"lg"}
                size={{ base: "xs", md: "sm" }}
                position="relative"
              >
                <LuShoppingCart size={18} />
                <Text display={{ base: "none", sm: "block" }}>Cart</Text>
                {items.length > 0 && (
                  <Badge
                    colorPalette="purple"
                    rounded="full"
                    position="absolute"
                    top="-6px"
                    right="-6px"
                    fontSize="10px"
                    px={2}
                  >
                    {items.length}
                  </Badge>
                )}
              </Button>
            </Link>

            <Button
              onClick={toggleColorMode}
              variant={"ghost"}
              rounded={"lg"}
              size={{ base: "xs", md: "sm" }}
            >
              {colorMode === "light" ? <FaRegMoon /> : <MdOutlineWbSunny />}
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default NavBar;
