import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartState } from "../utils/types";

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addToCart: (product) =>
                set((state) => ({
                    items: [...state.items, { ...product, quantity: 1 }],
                })),

            removeFromCart: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item._id !== id),
                })),

            updateQuantity: (id, action) =>
                set((state) => {
                    const item = state.items.find((i) => i._id === id);
                    if (!item) return state;

                    if (action === "decrease" && item.quantity === 1) {
                        return { items: state.items.filter((i) => i._id !== id) };
                    }

                    return {
                        items: state.items.map((i) =>
                            i._id === id
                                ? {
                                    ...i,
                                    quantity:
                                        action === "increase" ? i.quantity + 1 : i.quantity - 1,
                                }
                                : i
                        ),
                    };
                }),

            totalPrice: () =>
                get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }),
        { name: "cart-storage" }
    )
);