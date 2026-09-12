import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  VStack,
  Text,
  IconButton,
  Input,
  Separator,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { LuGithub, LuTwitter, LuInstagram, LuSend } from "react-icons/lu";
import { Link as RouterLink } from "react-router-dom";
import { useColorModeValue } from "../components/ui/color-mode";

const Footer = () => {
  const bg = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("gray.900", "white");
  const inputBg = useColorModeValue("gray.50", "gray.800");

  const shopLinks = [
    { label: "All products", to: "/" },
    { label: "Cart", to: "/cart" },
  ];
  const companyLinks = [
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];
  const helpLinks = [
    { label: "FAQs", to: "/faq" },
    { label: "Shipping & returns", to: "/shipping" },
  ];

  return (
    <Box
      as="footer"
      bg={bg}
      borderTop="1px solid"
      borderColor={borderColor}
    >
      <Container maxW={"1140px"} py={12}>
        <Grid
          textAlign={{ base: "center", md: "start" }}
          templateColumns={{
            base: "1fr",
            md: "1fr 1fr 1fr",
            lg: "1fr 1fr 1fr 2fr",
          }}
          gap={{ base: 6, md: 8 }}
          justifyItems={{ base: "center", md: "start" }}
        >
          {/* Brand Info */}
          <GridItem>
            <HStack justifyContent={{ base: "center", md: "start" }} mb={2}>
              <Box
                w={6}
                h={6}
                rounded={"md"}
                bg={"purple.500"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                color={"white"}
                fontWeight={"bold"}
                fontSize={"xs"}
              >
                P
              </Box>
              <Text fontWeight={"bold"} color={headingColor} lineHeight="1">
                Product Store
              </Text>
            </HStack>

            <VStack gap={"2px"} align={{ base: "center", md: "start" }}>
              <Text fontSize={"sm"} color={textColor} lineHeight="1.4">
                Straightforward shopping, honest prices, no fuss at checkout.
              </Text>
              <HStack gap={2}>
                <IconButton
                  aria-label="GitHub"
                  variant="ghost"
                  size="sm"
                  rounded="lg"
                  color={textColor}
                >
                  <LuGithub size={16} />
                </IconButton>
                <IconButton
                  aria-label="Twitter"
                  variant="ghost"
                  size="sm"
                  rounded="lg"
                  color={textColor}
                >
                  <LuTwitter size={16} />
                </IconButton>
                <IconButton
                  aria-label="Instagram"
                  variant="ghost"
                  size="sm"
                  rounded="lg"
                  color={textColor}
                >
                  <LuInstagram size={16} />
                </IconButton>
              </HStack>
            </VStack>
          </GridItem>

          {/* Shop Column */}
          <GridItem>
            <Text
              fontWeight={"semibold"}
              fontSize={"sm"}
              color={headingColor}
              lineHeight="1"
              mb={2}
            >
              Shop
            </Text>

            <VStack gap={"2px"} align={{ base: "center", md: "start" }}>
              {shopLinks.map((link) => (
                <ChakraLink
                  asChild
                  key={link.label}
                  fontSize={"sm"}
                  color={textColor}
                  _hover={{ color: "purple.500" }}
                >
                  <RouterLink to={link.to}>{link.label}</RouterLink>
                </ChakraLink>
              ))}
            </VStack>
          </GridItem>

          {/* Company & Help Column */}
          <GridItem>
            <Text
              fontWeight={"semibold"}
              fontSize={"sm"}
              color={headingColor}
              lineHeight="1"
              mb={2}
            >
              Company
            </Text>
            <VStack align={{ base: "center", md: "start" }} gap={"2px"}>
              {companyLinks.map((link) => (
                <ChakraLink
                  asChild
                  key={link.label}
                  fontSize={"sm"}
                  color={textColor}
                  _hover={{ color: "purple.500" }}
                >
                  <RouterLink to={link.to}>{link.label}</RouterLink>
                </ChakraLink>
              ))}
            </VStack>
            <Text
              fontWeight={"semibold"}
              fontSize={"sm"}
              color={headingColor}
              lineHeight="1"
              mt={3}
              mb={2}
            >
              Help
            </Text>
            <VStack gap={"2px"} align={{ base: "center", md: "start" }}>
              {helpLinks.map((link) => (
                <ChakraLink
                  asChild
                  key={link.label}
                  fontSize={"sm"}
                  color={textColor}
                  _hover={{ color: "purple.500" }}
                >
                  <RouterLink to={link.to}>{link.label}</RouterLink>
                </ChakraLink>
              ))}
            </VStack>
          </GridItem>

          {/* Newsletter Column - Equal Spacing Applied */}
          <GridItem colSpan={{ base: 1, md: 2, lg: 1 }} justifySelf={"stretch"}>
            <Text
              fontWeight={"semibold"}
              fontSize={"sm"}
              color={headingColor}
              lineHeight="1"
              mb={2}
            >
              Stay in the loop
            </Text>
            <VStack align={{ base: "center", md: "start" }} gap={"2px"}>
              <Text fontSize={"sm"} color={textColor} pb={2}>
                New arrivals and price drops, once in a while.
              </Text>

              <HStack w={{ base: "full", md: "80%", lg: "full" }}>
                <Input
                  placeholder="you@email.com"
                  size={"lg"}
                  rounded={"lg"}
                  bg={inputBg}
                  border="1px solid"
                  borderColor={borderColor}
                />
                <IconButton
                  aria-label="Subscribe"
                  colorPalette={"purple"}
                  size={"lg"}
                  rounded={"lg"}
                >
                  <LuSend size={14} />
                </IconButton>
              </HStack>
            </VStack>
          </GridItem>
        </Grid>

        <Separator my={8} />

        <Flex
          direction={{ base: "column", md: "row" }}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={3}
        >
          <Text fontSize="xs" color={textColor}>
            © {new Date().getFullYear()} Product Store. All rights reserved.
          </Text>
          <HStack gap={4}>
            <ChakraLink
              fontSize={"xs"}
              color={textColor}
              _hover={{ color: "purple.500" }}
            >
              Privacy
            </ChakraLink>
            <ChakraLink
              fontSize={"xs"}
              color={textColor}
              _hover={{ color: "purple.500" }}
            >
              Terms
            </ChakraLink>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
