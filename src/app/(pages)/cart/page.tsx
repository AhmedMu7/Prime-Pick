"use client";

import { CheckoutForm } from "@/components/CheckoutForm";
import { CartContext } from "@/context/CartContext";
import { getUserToken } from "@/Helpers/getUserToken";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useContext, useState } from "react";

export default function Cart() {

  const {cartData , setCartData  } = useContext(CartContext);
  const [isLoadingItem, setIsLoadingItem] = useState<string | null>(null)
  const [isLoadingItemRemove, setIsLoadingItemRemove] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  
  
  async function UpdateItemCount(itemCartId : string , count : number){

    const token = await getUserToken();
    
    setIsLoadingItem(itemCartId);
    
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${itemCartId}`,{

        method:"PUT",
        body: JSON.stringify({count}),
        headers : {
            
            token : token +'',
            "Content-Type" : "application/json",
        }
        
    })
    const data = await response.json()

    if(data.status == "success"){

        setCartData(data)

    }

    setIsLoadingItem(null);

  }

  


   async function RemoveCartItem(itemCartId : string){
      const token = await getUserToken();

    setIsLoadingItemRemove(itemCartId)

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${itemCartId}` , {

      method:"DELETE",
      headers:{

        token : token +''

      }

    })

    const data = await response.json()

    if(data.status == "success"){
      setCartData(data)
    }

    setIsLoadingItemRemove(null)
  }


  async function ClearCart() {
  const token = await getUserToken();
    setIsLoading(true)

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart' , {

      method:"DELETE",
      headers:{

        token : token + ''
      }

    })

    const data = await response.json();

    if(data.message == "success"){

      setCartData(null)

    }
    console.log(data);
    
    setIsLoading(false)

  }

  return (
    <>
      <section className="container mx-auto mt-8 px-4">
        <h2 className="text-3xl md:text-4xl font-semibold mb-3">Shopping Cart</h2>
        <span className="mb-6 block text-gray-600 dark:text-gray-400">
          {cartData?.numOfCartItems} {cartData?.numOfCartItems === 1 ? 'item' : 'items'} in your cart
        </span>

        
        
        <div className="block lg:grid lg:grid-cols-3 gap-6">


          <div className="lg:col-span-2">
            {cartData?.data.products.map((item) => (
              <div
                className="flex justify-between gap-10 border dark:border-gray-700 p-4 mb-4 space-y-4 rounded-lg bg-white dark:bg-gray-900"
                key={item._id}
              >
                <div className="flex gap-4">
                  <div>
                    <Image
                      src={item.product.imageCover}
                      width={120}
                      height={120}
                      className="object-cover"
                      alt={item.product.title}
                    />
                  </div>

                  <div className="flex flex-col space-y-2 max-w-3/4">
                    <h1 className="font-semibold text-lg">{item.product.title}</h1>
                    <h2 className="text-gray-600 dark:text-gray-400">{item.product.brand.name}</h2>
                    <h2 className="text-gray-600 dark:text-gray-400">{item.product.category.name}</h2>

                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center border dark:border-gray-700 rounded-md">
                        <button disabled={item.count == 1} onClick={()=>{UpdateItemCount(item.product._id , item.count - 1)}} className=" hover:cursor-pointer px-3 pt-1 pb-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-md transition-colors">-</button>
                        <span className="px-4 py-1 font-medium border-x dark:border-gray-700"> {isLoadingItem === item.product._id ? <Loader2 className=" animate-spin"/> : item.count} </span>
                        <button  onClick={()=>{UpdateItemCount(item.product._id , item.count + 1)}} className="hover:cursor-pointer px-3 pt-1 pb-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-md transition-colors">+</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-center">
                  <h2 className="font-semibold text-lg">EGP {item.price * item.count}</h2>
                  <button onClick={()=> RemoveCartItem(item.product._id)} className="text-white px-4 py-2 bg-red-500 hover:bg-destructive rounded-md hover:cursor-pointer flex justify-center items-center"> {isLoadingItemRemove === item.product._id ? <Loader2 className=" animate-spin"/> : 'Remove'} </button>
                </div>
              </div>
            ))}


        </div>
        

          <div className="lg:col-start-3 lg:col-span-1 mb-6 lg:mb-0">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6  top-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-gray-600 dark:text-gray-400">Subtotal:</h3>
                  <span>EGP {cartData?.data.totalCartPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="text-gray-600 dark:text-gray-400">Items:</h3>
                  <span>{cartData?.numOfCartItems}</span>
                </div>
                <div className="border-t dark:border-gray-700 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Total:</h3>
                    <span className="font-semibold text-lg">EGP {cartData?.data.totalCartPrice}</span>
                  </div>
                </div>
                
            <CheckoutForm cartId ={cartData?.cartId}/>

                {(cartData?.numOfCartItems ?? 0) >= 1 ? <button onClick={()=> ClearCart() } className="hover:cursor-pointer w-full bg-destructive hover:bg-red-700 duration-200 text-white py-3 rounded-lg font-medium flex justify-center items-center">
                  {isLoading ? <Loader2 className=" animate-spin"/> : 'Clear Cart' }
                </button> : ''}
              </div>
            </div>
          </div>

          
        </div>
      </section>
    </>
  );
}
