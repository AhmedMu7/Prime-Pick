"use client"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function DropdownHeroUi() {

  const session = useSession()

  return (
    <Dropdown>
      <DropdownTrigger className=" outline-0 text-white hover:cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </DropdownTrigger>
      <DropdownMenu className="dark:bg-gray-700 bg-white outline-1 rounded-sm p-2 min-w-40" aria-label="Static Actions">
        {session.status == "unauthenticated" ? <> <DropdownItem className="hover:bg-teal-500 rounded-sm duration-100" key="new"><Link href={'/login'}>Login</Link></DropdownItem>
        <DropdownItem className="hover:bg-teal-500 rounded-sm duration-100" key="copy"><Link href={'/signup'}>Register</Link></DropdownItem> </> : <DropdownItem onClick={()=> signOut({
          callbackUrl:'/'
        })} className="hover:bg-destructive rounded-sm duration-100 text-destructive hover:text-white" key="edit">LogOut</DropdownItem>}      
      </DropdownMenu>
    </Dropdown>
  );
}
