import { Button, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { checkoutSchema } from "../utils/schema";
import { useCartStore } from "../store/cart-store";
import FloatingInput from "./FloatingInput";
import useInitializePayment from "../hooks/useInitializePayment";
import type { CartedItem } from "../utils/types";
import useAutofillRevalidate from "../hooks/useAutofillRevalidate";
import { useRef } from "react";

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const CheckoutForm = () => {
  const items = useCartStore((state) => state.items);
  const totalAmount = useCartStore((state) => state.totalPrice());
  const formRef = useRef<HTMLDivElement>(null);

  const { checkout, isCheckingOut } = useInitializePayment();

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { name: "", email: "", phone: "", address: "" },
  });

  const onSubmit = (values: CheckoutFormValues) => {
    const orderItems: CartedItem[] = items.map((item) => ({
      product: item._id, // rename _id → product
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    checkout({
      ...values,
      items: orderItems,
      totalAmount,
    });
  };

  useAutofillRevalidate(formRef, trigger);

  return (
    <VStack
      ref={formRef}
      as="form"
      gap={1}
      align="stretch"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <FloatingInput
            label="Full Name"
            name="name"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <FloatingInput
            label="Email Address"
            type="email"
            name="email"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <FloatingInput
            label="Phone Number"
            name="phone"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={errors.phone?.message}
          />
        )}
      />

      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <FloatingInput
            label="Shipping Address"
            name="address"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={errors.address?.message}
          />
        )}
      />

      <Button
        type="submit"
        colorPalette="purple"
        w="full"
        loading={isCheckingOut}
        loadingText="Redirecting..."
        disabled={isCheckingOut || !isValid}
        mt={2}
        size={"lg"}
        rounded={"lg"}
      >
        Proceed to Payment
      </Button>
    </VStack>
  );
};

export default CheckoutForm;
