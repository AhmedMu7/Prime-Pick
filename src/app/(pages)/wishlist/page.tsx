"use client";

import AddToCart from "@/components/AddToCart";
import { wishListContext } from "@/context/WishListContext";
import { getUserToken } from "@/Helpers/getUserToken";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

export default function WishList() {
  const { wishListitems ,getWishList } = useContext(wishListContext);
  const [isLoading, setIsLoading] = useState('')



  async function RemoveWishListProduct(wishListProductId : string){
      const token = await getUserToken();

    setIsLoading(wishListProductId);
    
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${wishListProductId}` , {
      
      method:"DELETE",
      
      
      headers:{
        
        token : token + ''
        
      }
    })
    
    const data = await response.json()
    
    setIsLoading('');

    if(data.status === "success"){
      
      toast.success("Product removed from your wishlist")
      await getWishList();
      
    }
  }

  return (
    <>
      <section className=" my-10">
        <h1 className="text-center font-bold text-4xl mb-5">My WishList</h1>

        <div className="container mx-auto px-4">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="w-32 p-4">Product</th>
                <th className="p-4 text-left">Product name</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Stock Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {wishListitems?.map((item) => (
                <tr key={item._id} className="border-t dark:border-gray-700">
                  <td className="p-4">
                    <Image
                      src={item.imageCover}
                      width={80}
                      height={80}
                      alt={item.title}
                      className="object-cover rounded-lg w-full"
                    />
                  </td>
                  <td className="p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {item.title.split(" ", 5).slice(0, 5).join(" ")}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.category.name}
                    </p>
                  </td>
                  <td className="p-4">
                    <span className="font-medium">EGP {item.price}</span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        item.quantity > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-3 items-center justify-center">
                      {isLoading === item._id ? <Loader2 className="animate-spin text-red-500"/> : <button onClick={()=>RemoveWishListProduct(item._id)}>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-7 hover:text-red-500 hover:cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>}
                      <AddToCart productId={item._id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
