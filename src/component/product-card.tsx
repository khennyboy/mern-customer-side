import {
  AspectRatio,
  Badge,
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LuMinus, LuPlus, LuShoppingCart } from "react-icons/lu";
import { useColorModeValue } from "../components/ui/color-mode";
import { useCartStore } from "../store/cart-store";
import type { ProductDetail } from "../utils/types";
import toast from "../utils/toast";

const LOW_STOCK = 5;

const getStockInfo = (quantity: number) => {
  if (quantity <= 0) return { label: "Out of stock", palette: "red" };
  if (quantity <= LOW_STOCK)
    return { label: `Only ${quantity} left`, palette: "orange" };
  return { label: `${quantity} in stock`, palette: "green" };
};

const ProductCard = ({ product }: { product: ProductDetail }) => {
  const cardBg = useColorModeValue("white", "gray.900");
  const cardBorder = useColorModeValue("gray.200", "gray.800");
  const imageBg = useColorModeValue("gray.50", "gray.800");
  const nameColor = useColorModeValue("gray.900", "white");
  const stepperBg = useColorModeValue("gray.100", "gray.800");
  const stepperHoverBg = useColorModeValue("gray.200", "gray.700");

  const cartItem = useCartStore((state) =>
    state.items.find((item) => item._id === product._id),
  );
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const addToCart = useCartStore((state) => state.addToCart);

  const stock = getStockInfo(product.quantity);
  const soldOut = product.quantity <= 0;
  // The customer already has every available item in the cart
  const atLimit = !!cartItem && cartItem.quantity >= product.quantity;

  return (
    <Box
      bg={cardBg}
      border="1px solid"
      borderColor={cardBorder}
      rounded={"xl"}
      overflow={"hidden"}
      display="flex"
      flexDirection="column"
    >
      <Box position="relative">
        <AspectRatio ratio={1}>
          <Image
            src={product.image}
            alt={product.name}
            objectFit={"cover"}
            bg={imageBg}
            opacity={soldOut ? 0.5 : 1}
          />
        </AspectRatio>

        <Badge
          position="absolute"
          top={2}
          left={2}
          zIndex={1}
          variant="solid"
          colorPalette={stock.palette}
          rounded="full"
          px={2}
        >
          {stock.label}
        </Badge>
      </Box>

      <VStack gap={3} alignItems={"stretch"} p={2} flex={1}>
        <HStack
          flex={1}
          gap={3}
          py={1}
          justifyContent={"space-between"}
          alignItems={"center"}
          fontSize={"sm"}
        >
          <Text
            fontSize={"sm"}
            color={nameColor}
            lineHeight={"shorter"}
            lineClamp={2}
            fontWeight={"semibold"}
          >
            {product.name}
          </Text>

          <Text color={nameColor} fontWeight={"bold"}>
            ${product.price.toFixed(2)}
          </Text>
        </HStack>

        {!cartItem ? (
          <Button
            onClick={() => {
              addToCart(product);
              toast(true, "Cart added successfully");
            }}
            disabled={soldOut}
            colorPalette={"purple"}
            rounded={"lg"}
            size={"sm"}
            h="42px" // Explicit height to match stepper
          >
            {!soldOut && <LuShoppingCart size={16} />}
            {soldOut ? "Out of stock" : "Add to cart"}
          </Button>
        ) : (
          <HStack
            justify={"space-between"}
            bg={stepperBg}
            rounded={"lg"}
            h="42px"
            px={1}
          >
            <IconButton
              aria-label="Decrease quantity"
              onClick={() => updateQuantity(product._id, "decrease")}
              size={"sm"}
              variant={"ghost"}
              rounded={"md"}
              _hover={{ bg: stepperHoverBg }}
            >
              <LuMinus size={14} />
            </IconButton>

            <Text fontWeight={"semibold"} fontSize={"sm"} color={nameColor}>
              {cartItem.quantity}
            </Text>

            <IconButton
              aria-label="Increase quantity"
              onClick={() => updateQuantity(product._id, "increase")}
              disabled={atLimit}
              size={"sm"}
              variant={"ghost"}
              rounded={"md"}
              _hover={{ bg: stepperHoverBg }}
            >
              <LuPlus size={14} />
            </IconButton>
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default ProductCard;