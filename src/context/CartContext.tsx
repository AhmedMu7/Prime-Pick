"use client";

import { CartResponse, item } from "@/interfaces/CartInterface";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext<{
  cartData: CartResponse | null;
  cartItems: item[] | null;
  isLoading: boolean;
  setisLoading: (value: boolean) => void;
  setCartItems: (value: item[]) => void;
  setCartData: (value: CartResponse | null) => void;
  getUserCart: () => void;
}>({
  cartData: null,
  cartItems: null,
  isLoading: true,
  setisLoading: () => {},
  setCartItems: () => {},
  setCartData: () => {},
  getUserCart: () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [cartItems, setCartItems] = useState<item[] | null>(null);
  const [isLoading, setisLoading] = useState(true);
  const session = useSession();

  async function getUserCart() {
    if (session.status == "authenticated") {
      const response = await fetch("/api/get-cart");

      const data: CartResponse = await response.json();

      setCartData(data);
      setCartItems(data.data.products);

      setisLoading(false);
    }
  }

  useEffect(() => {
    getUserCart();
  }, [session.status]);

  return (
    <CartContext.Provider
      value={{
        cartData,
        setCartData,
        getUserCart,
        cartItems,
        setCartItems,
        isLoading,
        setisLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
