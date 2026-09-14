
export type ProductDetail = {
    name: string;
    price: number;
    image: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export type CartItem = ProductDetail & { quantity: number };

export type CartState = {
    items: CartItem[];
    addToCart: (product: ProductDetail) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, action: "increase" | "decrease") => void;
    totalPrice: () => number;
};

export type ProductStore = {
    products: ProductDetail[];
    setProducts: (products: ProductDetail[]) => void;
    totalProducts: number;
    pageSize: number;
    setCounts: (totalProducts: number, pageSize: number) => void;
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
