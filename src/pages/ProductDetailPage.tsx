import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Dialog,
  HStack,
  Heading,
  IconButton,
  Image,
  Portal,
  Separator,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import {
  LuChevronLeft,
  LuChevronRight,
  LuMinus,
  LuPlus,
  LuX,
} from "react-icons/lu";
import { IoWarning } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useColorModeValue } from "../components/ui/color-mode";
import useGetProduct from "../hooks/useGetProduct";
import { useCartStore } from "../store/cart-store";
import { money } from "../utils/format-money";
import toast from "../utils/toast";

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const subTextColor = useColorModeValue("gray.500", "gray.400");
  const headingColor = useColorModeValue("gray.900", "white");
  const cardBg = useColorModeValue("white", "gray.900");
  const cardBorder = useColorModeValue("gray.200", "gray.800");
  const stepperBg = useColorModeValue("gray.100", "gray.800");
  const stepperHoverBg = useColorModeValue("gray.200", "gray.700");

  const { data: product, isLoading, error } = useGetProduct(slug);

  // cart hooks — must be called unconditionally (rules of hooks)
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const cartItem = useCartStore((state) =>
    state.items.find((item) => item._id === product?._id),
  );

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const next = useCallback(() => {
    if (!product) return;
    setLightboxIndex((i) =>
      i === null ? 0 : (i + 1) % product.images.length,
    );
  }, [product]);

  const prev = useCallback(() => {
    if (!product) return;
    setLightboxIndex((i) =>
      i === null
        ? 0
        : (i - 1 + product.images.length) % product.images.length,
    );
  }, [product]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, next, prev, closeLightbox]);

  if (isLoading) {
    return (
      <Center minH="60vh">
        <Spinner size="xl" color="purple.500" />
      </Center>
    );
  }

  if (error || !product) {
    return (
      <Container
        maxW="480px"
        py={12}
        minH="dvh"
        display="flex"
        alignItems="center"
      >
        <Box
          w="full"
          bg={cardBg}
          border="1px solid"
          borderColor="red.300"
          rounded="2xl"
          py={6}
          px={5}
        >
          <VStack gap={2}>
            <Box color="red.500">
              <IoWarning size={28} />
            </Box>
            <Text fontWeight="semibold" color={headingColor}>
              Product not found
            </Text>
            <Text color={subTextColor} fontSize="sm" textAlign="center">
              {error instanceof Error
                ? error.message
                : "The product you're looking for doesn't exist."}
            </Text>
            <Button
              mt={2}
              onClick={() => navigate("/")}
              colorPalette="purple"
              size="sm"
              rounded="lg"
            >
              Back to shop
            </Button>
          </VStack>
        </Box>
      </Container>
    );
  }

  const images = product.images;
  const [main, ...rest] = images;
  const currentImage = lightboxIndex !== null ? images[lightboxIndex] : null;
  const soldOut = product.quantity <= 0;
  const atLimit = !!cartItem && cartItem.quantity >= product.quantity;

  return (
    <Container maxW="1140px" py={8}>
      <Button variant="ghost" mb={4} onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
        {/* GALLERY */}
        <VStack align="stretch" gap={3}>
          <Box
            rounded="2xl"
            overflow="hidden"
            cursor="zoom-in"
            bg={cardBg}
            border="1px solid"
            borderColor={cardBorder}
            onClick={() => setLightboxIndex(0)}
          >
            <Image
              src={main?.url}
              alt={product.name}
              objectFit="cover"
              w="full"
              aspectRatio={4 / 3}
            />
          </Box>

          {rest.length > 0 && (
            <HStack gap={2} flexWrap="wrap">
              {rest.map((img, i) => {
                const index = i + 1;
                return (
                  <Box
                    key={img.publicId || img.url}
                    onClick={() => setLightboxIndex(index)}
                    cursor="zoom-in"
                    rounded="lg"
                    overflow="hidden"
                    border="2px solid"
                    borderColor="transparent"
                    _hover={{ borderColor: "purple.400" }}
                    transition="all 0.15s ease"
                    boxSize="72px"
                  >
                    <Image
                      src={img.url}
                      alt={`${product.name} ${index + 1}`}
                      boxSize="72px"
                      objectFit="cover"
                    />
                  </Box>
                );
              })}
            </HStack>
          )}
        </VStack>

        {/* INFO */}
        <VStack align="stretch" gap={4}>
          <Heading size="lg" color={headingColor}>
            {product.name}
          </Heading>

          <HStack gap={2} wrap="wrap">
            <Badge colorPalette="purple" variant="subtle" rounded="full" px={3}>
              {product.category}
            </Badge>
            <Badge
              colorPalette={soldOut ? "red" : "green"}
              variant="subtle"
              rounded="full"
              px={3}
            >
              {soldOut ? "Out of stock" : `${product.quantity} in stock`}
            </Badge>
          </HStack>

          <Text fontSize="3xl" fontWeight="bold" color="purple.500">
            {money(product.price)}
          </Text>

          <Separator />

          <Box>
            <Heading size="sm" mb={2} color={headingColor}>
              Description
            </Heading>
            <Text color={subTextColor} whiteSpace="pre-wrap">
              {product.description}
            </Text>
          </Box>

          {/* ADD TO CART / STEPPER */}
          {!cartItem ? (
            <Button
              onClick={() => {
                addToCart(product);
                toast(true, "Added to cart");
              }}
              disabled={soldOut}
              colorPalette="purple"
              size="lg"
              rounded="xl"
              mt={2}
              w="full"
              h="52px"
            >
              {soldOut ? "Out of stock" : "Add to cart"}
            </Button>
          ) : (
            <HStack
              justify="space-between"
              bg={stepperBg}
              rounded="xl"
              h="52px"
              px={2}
              mt={2}
              w="full"
            >
              <IconButton
                aria-label="Decrease quantity"
                onClick={() => updateQuantity(product._id, "decrease")}
                variant="ghost"
                rounded="lg"
                size="lg"
                _hover={{ bg: stepperHoverBg }}
              >
                <LuMinus />
              </IconButton>

              <Text fontWeight="semibold" fontSize="lg">
                {cartItem.quantity}
              </Text>

              <IconButton
                aria-label="Increase quantity"
                onClick={() => updateQuantity(product._id, "increase")}
                disabled={atLimit}
                variant="ghost"
                rounded="lg"
                size="lg"
                _hover={{ bg: stepperHoverBg }}
              >
                <LuPlus />
              </IconButton>
            </HStack>
          )}
        </VStack>
      </SimpleGrid>

      {/* LIGHTBOX */}
      <Dialog.Root
        open={lightboxIndex !== null}
        onOpenChange={(e) => !e.open && closeLightbox()}
        size="xl"
        preventScroll
        scrollBehavior="inside"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content
              bg="transparent"
              shadow="none"
              maxW="5xl"
              w="full"
              position="relative"
            >
              <Dialog.Body p={0} position="relative">
                {currentImage && (
                  <Box position="relative">
                    <IconButton
                      aria-label="Close"
                      position="absolute"
                      top={2}
                      right={2}
                      zIndex={2}
                      rounded="full"
                      onClick={closeLightbox}
                    >
                      <LuX />
                    </IconButton>

                    {images.length > 1 && (
                      <IconButton
                        aria-label="Previous"
                        position="absolute"
                        left={2}
                        top="50%"
                        transform="translateY(-50%)"
                        zIndex={2}
                        rounded="full"
                        size="lg"
                        onClick={prev}
                      >
                        <LuChevronLeft />
                      </IconButton>
                    )}

                    <Box
                      w="full"
                      maxW="900px"
                      h="600px"
                      maxH="80vh"
                      mx="auto"
                      bg="blackAlpha.700"
                      rounded="xl"
                      overflow="hidden"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src={currentImage.url}
                        alt={product.name}
                        w="full"
                        h="full"
                        objectFit="contain"
                        p={2}
                      />
                    </Box>

                    {images.length > 1 && (
                      <IconButton
                        aria-label="Next"
                        position="absolute"
                        right={2}
                        top="50%"
                        transform="translateY(-50%)"
                        zIndex={2}
                        rounded="full"
                        size="lg"
                        onClick={next}
                      >
                        <LuChevronRight />
                      </IconButton>
                    )}

                    {images.length > 1 && (
                      <Box
                        position="absolute"
                        bottom={3}
                        left="50%"
                        transform="translateX(-50%)"
                        bg="blackAlpha.700"
                        color="white"
                        px={3}
                        py={1}
                        rounded="full"
                        fontSize="sm"
                      >
                        {lightboxIndex! + 1} / {images.length}
                      </Box>
                    )}
                  </Box>
                )}
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Container>
  );
};

export default ProductDetailPage;