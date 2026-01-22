"use client"

import { getUserToken } from "@/Helpers/getUserToken";
import { Product } from "@/interfaces/productInterface";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";



export const wishListContext = createContext<{


    wishListitems : Product[] | null ,
    setwishListitems : (value:Product[])=> void 
    getWishList : ()=> void


}>({

    wishListitems : null,
    setwishListitems : ()=>{},
    getWishList : ()=> {}

})





export default function WishListContextProvider({children} : {children : ReactNode}){

    const [wishListitems, setwishListitems] = useState<Product[] | null>(null)
    const session = useSession()


    async function getWishList(){
          const token = await getUserToken();

        if (session.status == "authenticated"){

            
            const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist' , {
    
                method : "GET",
                headers:{
    
                    token : token +'',
    
                }
            })
    
            const data = await response.json()
            setwishListitems(data.data)
        }
    }


    useEffect(()=>{


        getWishList()


    } , [session.status])


return <wishListContext.Provider value={{wishListitems , setwishListitems ,getWishList}}>

    {children}

</wishListContext.Provider>
}