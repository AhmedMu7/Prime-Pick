"use client";

import { wishListContext } from "@/context/WishListContext";
import { getUserToken } from "@/Helpers/getUserToken";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AddtoWishList({ productId }: { productId: string }) {
  const { getWishList, wishListitems } = useContext(wishListContext);
  const [isInWishList, setIsInWishList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsInWishList(
      wishListitems?.some((item) => item._id === productId) ?? false
    );
  }, [wishListitems, productId]);

  async function toggleWishList() {
    const token = await getUserToken();
    setIsLoading(true);
    try {
      if (isInWishList) {
        // Remove from wishlist
        const response = await fetch(
          `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
          {
            method: "DELETE",
            headers: {
              token: token + "",
            },
          }
        );
        const data = await response.json();
        if (data.status === "success") {
          setIsInWishList(false);
          toast.success("Product removed from your wishlist");
        }
      } else {
        // Add to wishlist
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/wishlist",
          {
            method: "POST",
            body: JSON.stringify({ productId }),
            headers: {
              token: token + "",
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.status === "success") {
          setIsInWishList(true);
          toast.success("Product added to your wishlist");
        }

        if (!response.ok) {
          toast("Please log in to your account ", { icon: "🙂" });
        }
      }
      // Update the global wishlist state
      await getWishList();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={toggleWishList}
        disabled={isLoading}
        className={`${
          isLoading ? "opacity-50" : ""
        } transition-transform active:scale-95`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-6 ${
            isInWishList ? "fill-red-500 text-red-500" : "fill-white"
          } 
            hover:cursor-pointer duration-200 hover:text-red-500 hover:fill-red-500
            ${isLoading ? "animate-pulse" : ""}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </button>
    </>
  );
}
