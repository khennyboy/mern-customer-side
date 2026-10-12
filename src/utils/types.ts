import type { InputProps } from "@chakra-ui/react";

// ─── Category ─────────────────────────────────────────────────
export const CATEGORIES = [
    "Electronics",
    "Fashion",
    "Home",
    "Beauty",
    "Sports",
    "Books",
    "Toys",
    "Wears",
    "Others",
] as const;

export type Category = (typeof CATEGORIES)[number];

// ─── Product ──────────────────────────────────────────────────
export type ProductImage = {
    url: string;
    publicId: string;
};

export type ProductDetail = {
    _id: string;
    name: string;
    slug: string;
    description: string;
    category: Category;
    price: number;
    quantity: number;
    images: ProductImage[];
    createdAt: string;
    updatedAt: string;
};

// ─── Cart ─────────────────────────────────────────────────────
export type CartItemDetails = ProductDetail & {
    quantity: number;
};

export type CartState = {
    items: CartItemDetails[];
    addToCart: (product: ProductDetail) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, action: "increase" | "decrease") => void;
    totalPrice: () => number;
    clearCart: () => void;
};

// ─── Product store ────────────────────────────────────────────
export type ProductStore = {
    products: ProductDetail[];
    setProducts: (products: ProductDetail[]) => void;
    totalProducts: number;
    pageSize: number;
    setCounts: (totalProducts: number, pageSize: number) => void;
    CartDialog: boolean;
    setCartDialog: (open: boolean) => void;
};

// ─── API responses ────────────────────────────────────────────
export type GetProductsSuccessResponse = {
    success: true;
    data: ProductDetail[];
    totalProducts: number;
    pageSize: number;
};

export type GetProductsErrorResponse = {
    success: false;
    message: string;
};

export type Pagination = {
    pageSize: number;
    totalPages: number;
    totalProducts: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
};


export type OrderStatus = "unconfirmed" | "confirmed";
export type DeliveryStatus = "pending" | "delivered";
export type RefundStatus = "refund_needed" | "refunded";

export interface CartedItem {
    product: string; // the Product's _id
    name: string;
    price: number;
    quantity: number;
}

export interface Order {
    _id: string;
    customerName: string;
    customerEmail: string;
    shippingAddress: string;
    phone: string;
    items: CartedItem[];
    totalAmount: number;
    paystackReference: string;
    orderStatus?: OrderStatus;
    expiresAt?: string;
    refundItems?: CartedItem[];
    refundAmount?: number;
    refundStatus?: RefundStatus;
    refundedAt?: string;
    deliveryStatus?: DeliveryStatus;
    createdAt: string;
    updatedAt: string;
}


export type FloatingInputProps = InputProps & {
    label: string;
    error?: string;
};