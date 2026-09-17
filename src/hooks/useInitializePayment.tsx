import { useMutation } from "@tanstack/react-query";
import type { CartedItem } from "../utils/types";

interface InitializePaymentPayload {
  name: string;
  email: string;
  address: string;
  phone: string;
  items: CartedItem[];
  totalAmount: number;
}

interface InitializePaymentResponse {
  success: boolean;
  authorization_url: string;
  reference: string;
}

const initializePayment = async (
  payload: InitializePaymentPayload,
): Promise<InitializePaymentResponse> => {
  const res = await fetch(
    `${import.meta.env.VITE_ADMIN_URL}/api/orders/initialize`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to initialize payment");
  }

  return data;
};

const useInitializePayment = () => {
  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: initializePayment,
    onSuccess: (data) => {
      // Paystack gives you a hosted payment page — send the browser there
      window.location.replace(data.authorization_url);
    },
  });

  return { checkout, isCheckingOut };
};

export default useInitializePayment;
