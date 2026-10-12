import { useQuery } from "@tanstack/react-query";
import type { ProductDetail } from "../utils/types";

type SingleProductResponse = {
  success: boolean;
  data: ProductDetail;
};

const fetchProductBySlug = async (slug: string): Promise<ProductDetail> => {
  const res = await fetch(
    `${import.meta.env.VITE_ADMIN_URL}/api/products/${slug}`,
    { credentials: "include" },
  );

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({
      message: "An unknown network error occurred.",
    }));
    throw new Error(errorJson.message);
  }

  const json: SingleProductResponse = await res.json();
  return json.data;
};

const useGetProduct = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug as string),
    enabled: !!slug,
  });
};

export default useGetProduct;