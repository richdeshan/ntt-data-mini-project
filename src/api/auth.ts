"use server"


import axios from "axios";
import { LoginPayload, User } from "@/types/auth";

export const login = async (
  payload: LoginPayload
): Promise<User> => {
  const response = await axios.post(
    "https://dummyjson.com/auth/login",
    payload
  );

  return response.data;
};

export async function updateProduct(id: string, productData: any) {
  try {
    if (Number(id) > 100 || isNaN(Number(id))) {
      return { id, ...productData };
    }

    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}