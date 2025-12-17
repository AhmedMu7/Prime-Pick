"use client"
import React, { ReactNode } from 'react'
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import CartContextProvider from "@/context/CartContext";
import WishListContextProvider from "@/context/WishListContext";
import { SessionProvider } from "next-auth/react";

export default function Provider({children} : {children : ReactNode}) {
  return (
    <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CartContextProvider>
              <WishListContextProvider>
                <Toaster />
                <Navbar />
                {children}
                <Footer />
              </WishListContextProvider>
            </CartContextProvider>
          </ThemeProvider>
        </SessionProvider>
  )
}
