"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import DropdownHeroUi from "./ui/DropdownMenu";
import { useSession } from "next-auth/react";
import Image from "next/image";
import logo from '../../public/f9322f46-7e48-4c95-bf53-16c32e8a3b94.png'

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  const{cartData} = useContext(CartContext)

  const session = useSession()

  console.log(session);
  console.log(cartData?.cartId);
  
  
  
  

  return (
    <>
      <nav className="bg-gray-800 py-5 top-0 sticky z-50 ">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <Link href={"/"} className="text-3xl font-semibold text-white">
              <span className="text-teal-600">P</span>rime<span className="text-teal-600">P</span>ick
            </Link>

            {/* <div className="flex w-1/2 py-4 px-3 outline outline-amber-50 rounded-4xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>

              <input
                type="text"
                placeholder="Search the products"
                className="w-full outline-0 ms-2 text-gray-50"
              />
            </div> */}
                      <div>
            <ul className="flex justify-center items-center space-x-6 text-white">
              <li>
                <Link
                  className="hover: cursor-pointer hover:bg-gray-700 px-5 py-2 rounded-xl duration-200"
                  href={"/"}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="hover: cursor-pointer hover:bg-gray-700 px-5 py-2 rounded-xl duration-200"
                  href={"/categories"}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  className="hover: cursor-pointer hover:bg-gray-700 px-5 py-2 rounded-xl duration-200"
                  href={"/brands"}
                >
                  Brands
                </Link>
              </li>
            </ul>
          </div>

            <div className="flex space-x-6">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center justify-center hover:cursor-pointer"
              >
                {theme === "dark" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                    />
                  </svg>
                )}
              </button>

              <Link href={'/wishlist'}>
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              
              </Link>

              <div className="flex gap-2 ">

                {session.status == "authenticated" && <span className="text-white" >Hi {session.data?.user.name} </span>}
                <DropdownHeroUi/>
              </div>

             <div className="flex relative">
                <Link href={'/cart'}>
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>

                {(cartData?.numOfCartItems ?? 0) > 0 ? <Badge className="bg-teal-600 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-2 -end-2">
                  {cartData?.numOfCartItems}
                </Badge> : ''}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
