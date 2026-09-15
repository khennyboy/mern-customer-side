import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, Button, Center, Spinner, Text, VStack } from "@chakra-ui/react";
import { useCartStore } from "../store/cart-store";

const verifyPayment = async (reference: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_ADMIN_URL}/api/orders/verify?reference=${reference}`,
    {
      credentials: "include",
    },
  );
  return res.json();
};

const PaymentVerifyPage = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference") || searchParams.get("trxref");
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["verify-payment", reference],
    queryFn: () => verifyPayment(reference as string),
    enabled: !!reference,
    retry: false,
  });

  useEffect(() => {
    if (data?.success) clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const status =
    !reference || isError || (data && !data.success)
      ? "failed"
      : isLoading
        ? "loading"
        : "success";

  return (
    <Center minH="100vh">
      <VStack gap={4}>
        {status === "loading" && (
          <>
            <Spinner size="xl" />
            <Text>Confirming your payment…</Text>
          </>
        )}
        {status === "success" && (
          <Box textAlign="center">
            <Text fontSize="xl" fontWeight="semibold">
              Payment successful 🎉
            </Text>
            <Text color="gray.500" mb={4}>
              A receipt has been sent to your email.
            </Text>
            <Button colorPalette="purple" onClick={() => navigate("/")}>
              Continue shopping
            </Button>
          </Box>
        )}
        {status === "failed" && (
          <Box textAlign="center">
            <Text fontSize="xl" fontWeight="semibold" color="red.500">
              Payment failed
            </Text>
            <Button mt={4} variant="outline" onClick={() => navigate("/cart")}>
              Back to cart
            </Button>
          </Box>
        )}
      </VStack>
    </Center>
  );
};

export default PaymentVerifyPage;
