"use client"

import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Category } from "@/interfaces/productInterface";

export default function CategoriesMenu() {

      const [categories, setCategories] = useState<Category[]>([])

      async function getCategories() {
    try {
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories', {
        method: 'GET',
      })

      const { data } = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  useEffect(()=>{

    getCategories()

  },[])

  return (
    <>
      <NavigationMenu >
        <NavigationMenuList>
            {categories.map((category)=>          <NavigationMenuItem key={category._id}>
            <NavigationMenuTrigger > {category.name} </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink> {category.slug} </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>)}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
