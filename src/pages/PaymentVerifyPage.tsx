import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCartStore } from "../store/cart-store";

interface VerifyResponse {
  success: boolean;
  message?: string;
  httpStatus: number;
}

type Status =
  | "loading"
  | "success"
  | "not_paid" // Paystack says the payment was not completed
  | "uncertain" // we could not confirm, the customer may have been charged
  | "no_reference";

const verifyPayment = async (reference: string): Promise<VerifyResponse> => {
  const res = await fetch(
    `${import.meta.env.VITE_ADMIN_URL}/api/orders/verify?reference=${reference}`,
    { credentials: "include" },
  );
  const body = await res.json();
  return { ...body, httpStatus: res.status };
};

const PaymentVerifyPage = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference") || searchParams.get("trxref");
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();

  const { data, isError, isFetching, refetch } = useQuery({
    queryKey: ["verify-payment", reference],
    queryFn: () => verifyPayment(reference as string),
    enabled: !!reference,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });


  useEffect(() => {
    if (data?.success) clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.success]);

  // Warn before leaving while we are confirming
  useEffect(() => {
    if (!isFetching) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isFetching]);

  let status: Status;
  if (!reference) status = "no_reference";
  else if (isFetching) status = "loading";
  else if (isError || !data) status = "uncertain";
  else if (data.success) status = "success";
  else if (data.httpStatus === 400) status = "not_paid";
  else status = "uncertain";

  const referenceLine = (
    <Text
      fontSize="sm"
      color="gray.500"
      wordBreak="break-all"
      maxW="320px"
      mx="auto"
      mt={3}
    >
      Reference: {reference}
    </Text>
  );

  return (
    <Center minH="100vh" px={4}>
      <VStack gap={4}>
        {status === "loading" && (
          <>
            <Spinner size="xl" />
            <Text>Confirming your payment…</Text>
            <Text
              fontSize="sm"
              color="orange.500"
              textAlign="center"
              maxW="320px"
            >
              Please don't close or refresh this page until confirmation is
              complete, or your order may not go through.
            </Text>
          </>
        )}

        {status === "success" && (
          <Box textAlign="center" maxW="340px">
            <Text fontSize="xl" fontWeight="semibold">
              Payment successful 🎉
            </Text>
            <Text color="gray.500" mb={4}>
              {data?.message}
            </Text>
            <Button colorPalette="purple" onClick={() => navigate("/")}>
              Continue shopping
            </Button>
          </Box>
        )}

        {status === "not_paid" && (
          <Box textAlign="center" maxW="340px">
            <Text fontSize="xl" fontWeight="semibold" color="red.500">
              Payment not completed
            </Text>
            <Text color="gray.500" mt={2}>
              If you were charged, please contact us with your reference below.
            </Text>
            {referenceLine}
            <Button mt={4} variant="outline" onClick={() => navigate("/cart")}>
              Back to cart
            </Button>
          </Box>
        )}

        {status === "uncertain" && (
          <Box textAlign="center" maxW="340px">
            <Text fontSize="xl" fontWeight="semibold" color="orange.500">
              We couldn't confirm your payment
            </Text>
            <Text color="gray.500" mt={2}>
              This may be a temporary problem. If you were charged, please don't
              pay again. Contact us with your reference below and we will sort
              it out.
            </Text>
            {referenceLine}
            <HStack justify="center" mt={4}>
              <Button colorPalette="purple" onClick={() => refetch()}>
                Try again
              </Button>
              <Button variant="outline" onClick={() => navigate("/cart")}>
                Back to cart
              </Button>
            </HStack>
          </Box>
        )}

        {status === "no_reference" && (
          <Box textAlign="center">
            <Text fontSize="xl" fontWeight="semibold" color="red.500">
              Payment reference missing
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