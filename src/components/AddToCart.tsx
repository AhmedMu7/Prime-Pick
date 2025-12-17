"use client"

import { CartContext } from "@/context/CartContext";
import { getUserToken } from "@/Helpers/getUserToken";
import { CartResponse } from "@/interfaces/CartInterface";
import {  Loader2 } from "lucide-react";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

export default function AddToCart({productId} : {productId:string}) {

    const {getUserCart} = useContext(CartContext)

    const [isLoading, setIsLoading] = useState(false)


    async function addToCart(){
        const token = await getUserToken();
        setIsLoading(true)
        
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart" , {
            
            method:'POST',
            body: JSON.stringify({productId}),
            headers:{
                token: token + '' , "Content-Type" : "application/json",
            }
            
        });
        
        const data : CartResponse = await response.json();

        data.status == 'success' && toast.success(data.message!)
         if(data.status == 'success'){

            getUserCart()

         }

         if(!response.ok){
          toast("Please log in to your account " , {icon:'🙂'})
         }


          console.log(data);
        setIsLoading(false)
        
    }

  return (
    <>
      <button onClick={addToCart} className="hover:cursor-pointer group w-full text-white bg-teal-600 hover:bg-teal-700 duration-200 flex justify-center  items-center px-2 py-1 rounded-md ">
        Add to Cart{" "}
        {isLoading ? <Loader2 className=" ms-2 size-5 animate-spin"/> :         <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 text-white ms-2 group-hover:text-white duration-200"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>}
      </button>
    </>
  );
}
