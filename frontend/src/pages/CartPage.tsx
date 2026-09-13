import {
  Box,
  Button,
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Image,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuMinus, LuPlus, LuShoppingBag, LuTrash2 } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useColorModeValue } from "../components/ui/color-mode";
import { useCartStore } from "../store/cart-store";
import toast from "../utils/toast";

const PAGE_SIZE = 10;

const CartPage = () => {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const handleRemove = (id: string, name: string) => {
    removeFromCart(id);
    toast(true, `${name} removed from cart`);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, items.length));
  };

  const pageBg = useColorModeValue("white", "gray.950");
  const headingColor = useColorModeValue("gray.900", "white");
  const subTextColor = useColorModeValue("gray.500", "gray.400");
  const priceColor = useColorModeValue("gray.900", "white");
  const dividerColor = useColorModeValue("gray.150", "gray.800");
  const stepperBorder = useColorModeValue("gray.200", "gray.700");
  const summaryBg = useColorModeValue("gray.50", "gray.900");
  const iconMuted = useColorModeValue("gray.400", "gray.500");

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <Box minH="100vh" bg={pageBg} py={20}>
        <Container maxW={"420px"}>
          <Center flexDirection={"column"} gap={4}>
            <Box color={iconMuted}>
              <LuShoppingBag size={36} strokeWidth={1.5} />
            </Box>
            <VStack gap={1}>
              <Heading
                fontSize={"xl"}
                fontWeight={"semibold"}
                color={headingColor}
              >
                Your cart is empty
              </Heading>
              <Text color={subTextColor} fontSize={"sm"} textAlign={"center"}>
                Items you add will show up here.
              </Text>
            </VStack>
            <Link to={"/"}>
              <Button
                colorPalette={"purple"}
                variant={"outline"}
                rounded={"full"}
                size={"sm"}
                mt={2}
              >
                Browse products
              </Button>
            </Link>
          </Center>
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg={pageBg} py={{ base: 8, md: 14 }}>
      <Container maxW={{ base: "450px", md: "820px" }}>
        <HStack
          justify={"space-between"}
          align={"baseline"}
          mb={{ base: 6, md: 10 }}
        >
          <Heading
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight={"semibold"}
            letterSpacing={"-0.02em"}
            color={headingColor}
          >
            Cart
          </Heading>
          <Text color={subTextColor} fontSize={"sm"}>
            {itemCount} item{itemCount === 1 ? "" : "s"}
          </Text>
        </HStack>

        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={{ base: 8, lg: 8 }}
        >
          <GridItem>
            {visibleItems.map((item, index) => (
              <Box key={item._id}>
                {index > 0 && <Separator borderColor={dividerColor} />}
                <HStack py={5} gap={4} align={"start"}>
                  {/* <AspectRatio ratio={1}> */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    // width={{ base: "80px", sm: "90px" }}
                    objectFit={"cover"}
                    rounded={"md"}
                    flexShrink={0}
                    alignSelf={"stretch"}
                  />
                  {/* </AspectRatio> */}

                  <VStack align={"stretch"} flex={1} gap={3} minW={0}>
                    <VStack align={"stretch"} gap={0.5}>
                      <HStack gap={1.5} justifyContent={"space-between"}>
                        <Text
                          fontWeight={"medium"}
                          fontSize={"md"}
                          lineClamp={1}
                          color={headingColor}
                        >
                          {item.name}
                        </Text>
                        <Text color={subTextColor} fontSize={"sm"}>
                          x{item.quantity}
                        </Text>
                      </HStack>
                      <Text
                        fontWeight={"semibold"}
                        fontSize={"md"}
                        color={priceColor}
                      >
                        ${item.price.toFixed(2)}
                      </Text>
                    </VStack>

                    <HStack
                      border={"1px solid"}
                      borderColor={stepperBorder}
                      rounded={"full"}
                      gap={0}
                      overflow={"hidden"}
                      justifyContent={"space-between"}
                    >
                      <IconButton
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(item._id, "decrease")}
                        variant={"ghost"}
                        size={"sm"}
                        px={4}
                        py={3}
                        h={"auto"}
                      >
                        <LuMinus size={16} />
                      </IconButton>
                      <Text
                        fontSize={"sm"}
                        fontWeight={"medium"}
                        minW={"28px"}
                        textAlign={"center"}
                      >
                        {item.quantity}
                      </Text>
                      <IconButton
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(item._id, "increase")}
                        variant={"ghost"}
                        size={"sm"}
                        px={4}
                        py={3}
                        h={"auto"}
                      >
                        <LuPlus size={16} />
                      </IconButton>
                    </HStack>
                  </VStack>

                  <IconButton
                    aria-label="Remove item"
                    onClick={() => handleRemove(item._id, item.name)}
                    variant={"surface"}
                    size={"xs"}
                    color={iconMuted}
                    _hover={{ color: "red.500" }}
                  >
                    <LuTrash2 size={15} />
                  </IconButton>
                </HStack>
              </Box>
            ))}

            {hasMore && (
              <Box pt={4}>
                <Button
                  onClick={handleShowMore}
                  variant={"ghost"}
                  colorPalette={"purple"}
                  size={"sm"}
                >
                  Show more
                </Button>
              </Box>
            )}
          </GridItem>

          <GridItem>
            <Box
              bg={summaryBg}
              rounded={"lg"}
              p={6}
              position={{ lg: "sticky" }}
              top={{ lg: 8 }}
            >
              <Text
                fontWeight={"semibold"}
                fontSize={"sm"}
                color={headingColor}
                mb={4}
              >
                Order summary
              </Text>
              <VStack align={"stretch"} gap={2} mb={5}>
                <HStack justify={"space-between"}>
                  <Text color={subTextColor} fontSize={"sm"}>
                    Subtotal
                  </Text>
                  <Text fontSize={"sm"} color={headingColor}>
                    ${totalPrice().toFixed(2)}
                  </Text>
                </HStack>
                <HStack justify={"space-between"}>
                  <Text color={subTextColor} fontSize={"sm"}>
                    Shipping
                  </Text>
                  <Text fontSize={"sm"} color={subTextColor}>
                    Calculated at checkout
                  </Text>
                </HStack>
              </VStack>
              <Separator borderColor={dividerColor} mb={5} />
              <HStack justify={"space-between"} mb={6}>
                <Text fontWeight={"semibold"} color={headingColor}>
                  Total
                </Text>
                <Text
                  fontWeight={"semibold"}
                  fontSize={"lg"}
                  color={headingColor}
                >
                  ${totalPrice().toFixed(2)}
                </Text>
              </HStack>
              <Button
                colorPalette={"purple"}
                w={"full"}
                rounded={"full"}
                size={"lg"}
              >
                Checkout
              </Button>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default CartPage;
