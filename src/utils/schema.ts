import { z } from "zod"

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

export const checkoutSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(7, "Enter a valid phone number"),
    address: z.string().min(5, "Address is required"),
});