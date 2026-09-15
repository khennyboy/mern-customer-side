import type { InputProps } from "@chakra-ui/react";

export type ProductDetail = {
    name: string;
    price: number;
    image: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export type CartItemDetails = ProductDetail & { quantity: number };

export type CartState = {
    items: CartItemDetails[];
    addToCart: (product: ProductDetail) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, action: "increase" | "decrease") => void;
    totalPrice: () => number;
    clearCart: () => void
};

export type ProductStore = {
    products: ProductDetail[];
    setProducts: (products: ProductDetail[]) => void;
    totalProducts: number;
    pageSize: number;
    setCounts: (totalProducts: number, pageSize: number) => void;
    CartDialog: boolean,
    setCartDialog: (open: boolean) => void
};


// for GET /products — returns a LIST
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


// utils/types.ts
export interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
}

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
    paymentStatus: "pending" | "success" | "failed";
    deliveryStatus: "pending" | "delivered";
    createdAt: string;
    updatedAt: string;
}

export type FloatingInputProps = InputProps & {
    label: string;
    error?: string
};
