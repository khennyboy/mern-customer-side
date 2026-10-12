import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { LuPackageOpen } from "react-icons/lu";
import { IoWarning } from "react-icons/io5";
import useGetProducts from "../hooks/useGetProducts";
import { useProductStore } from "../store/products-store";
import { computePagination } from "../utils/compute-pagination";
import ProductCard from "../component/product-card";
import Productpagination from "../component/ProductPagination";
import { useColorModeValue } from "../components/ui/color-mode";
import { CATEGORIES } from "../utils/schema";

const HomePage = () => {
  const subTextColor = useColorModeValue("gray.500", "gray.400");
  const headingColor = useColorModeValue("gray.900", "white");
  const cardBg = useColorModeValue("white", "gray.900");
  const cardBorder = useColorModeValue("gray.200", "gray.800");

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "all";

  const products = useProductStore((state) => state.products);
  const totalProducts = useProductStore((state) => state.totalProducts);
  const pageSize = useProductStore((state) => state.pageSize);

  const { isLoading, error, isPlaceholderData } = useGetProducts();

  const pagination = computePagination(page, totalProducts, pageSize);

  const setCategory = (value: string) => {
    setSearchParams((prev) => {
      if (value === "all") prev.delete("category");
      else prev.set("category", value);
      prev.delete("page"); // reset to page 1 on filter change
      return prev;
    });
  };

  const goToPage = (p: number) => {
    setSearchParams((prev) => {
      prev.set("page", String(p));
      return prev;
    });
  };

  if (error) {
    return (
      <Container
        maxW={"480px"}
        py={12}
        minH={"dvh"}
        display={"flex"}
        alignItems={"center"}
      >
        <Box
          w={"full"}
          bg={cardBg}
          border="1px solid"
          borderColor={"red.300"}
          rounded={"2xl"}
          py={6}
          px={5}
        >
          <VStack gap={2}>
            <Box color={"red.500"}>
              <IoWarning size={28} />
            </Box>
            <Text fontWeight={"semibold"} color={headingColor}>
              Something went wrong
            </Text>
            <Text color={subTextColor} fontSize={"sm"} textAlign={"center"}>
              {error}
            </Text>
          </VStack>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW={"1140px"} py={8} minH={"dvh"}>
      <VStack gap={7} align={"stretch"}>
        {/* HEADING */}
        <VStack gap={0.5} align={"start"}>
          <Heading
            fontSize={"3xl"}
            fontWeight={"extrabold"}
            letterSpacing={"tight"}
            color={headingColor}
          >
            Shop Products
          </Heading>
          <Text color={subTextColor} fontSize={"md"}>
            {isLoading
              ? "Loading products…"
              : `${totalProducts} product${totalProducts === 1 ? "" : "s"} available`}
          </Text>
          {totalProducts !== 0 && pageSize < totalProducts && (
            <Text color={subTextColor} fontSize={"sm"}>
              Showing page {page} of {pagination.totalPages}
            </Text>
          )}
        </VStack>

        {/* FILTER BAR */}
        <HStack
          gap={2}
          overflowX="auto"
          pb={2}
          flexWrap={"wrap"}
          css={{
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          <Button
            size="sm"
            rounded="full"
            flexShrink={0}
            colorPalette="purple"
            variant={category === "all" ? "solid" : "outline"}
            onClick={() => setCategory("all")}
          >
            All
          </Button>
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              size="sm"
              rounded="full"
              flexShrink={0}
              colorPalette="purple"
              variant={category === cat ? "solid" : "outline"}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </HStack>

        {/* GRID */}
        {isLoading ? (
          <Center py={24}>
            <Spinner size="lg" color="purple.500" />
          </Center>
        ) : products.length === 0 ? (
          <Box
            bg={cardBg}
            border="1px solid"
            borderColor={cardBorder}
            rounded={"2xl"}
            py={20}
          >
            <VStack gap={3}>
              <Box color={subTextColor}>
                <LuPackageOpen size={40} />
              </Box>
              <Text
                fontWeight={"semibold"}
                fontSize={"lg"}
                color={headingColor}
              >
                {category === "all"
                  ? "No products available"
                  : "No products match this filter"}
              </Text>
              <Text
                color={subTextColor}
                fontSize={"sm"}
                maxW={"280px"}
                textAlign={"center"}
              >
                {category === "all"
                  ? "Check back later — new items are added regularly."
                  : "Try a different category or view all products."}
              </Text>
            </VStack>
          </Box>
        ) : (
          <VStack gap={10} align={"stretch"}>
            <SimpleGrid
              columns={{ base: 2, md: 3, lg: 4 }}
              gap={{ base: 4, md: 6 }}
              opacity={isPlaceholderData ? 0.5 : 1}
              transition="opacity 0.2s ease"
              pointerEvents={isPlaceholderData ? "none" : "auto"}
            >
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </SimpleGrid>

            <Productpagination
              pagination={pagination}
              page={page}
              onPageChange={goToPage}
            />
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;