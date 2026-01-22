"use client"

import Loading from '@/app/loading';
import ProductCard from '@/components/ProductCard';
import { Category, Product, ProductResponse, Subcategory } from '@/interfaces/productInterface'
import Image from 'next/image';
import React, {  useEffect, useState } from 'react'

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [subcategories, setsSubcategories] = useState<Subcategory[]>([])
  const [isLoading, setIsLoading] = useState(false)




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


  async function getCategoryProducts(categoryId : string) {
    setProducts([]);
    try {
      setIsLoading(true);
      const response = await fetch(`/api/get-categoryProducts?category=${categoryId}`);
      const data = await response.json()
      if (data.results && data.results > 0) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getAllProducts() {
    setProducts([]);
    try {
      setIsLoading(true);
      const response = await fetch('/api/get-products');
      const data = await response.json()
      
      if (data.results && data.results > 0) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching all products:', error);
    } finally {
      setIsLoading(false);
    }
  }


  async function getSubCategoies() {
    
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/subcategories',{
      method:"GET"
    })

    const data = await response.json();
    setsSubcategories(data.data)
  
  }




  useEffect(() => {
    getCategories();
    getAllProducts(); 
    getSubCategoies();
  }, [])

  return <>
  
  <div className='space-y-10 mt-8'>

    <section>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 container mx-auto'>
        {categories.map((item) => (
          <div onClick={()=>getCategoryProducts(item._id)} className='rounded-md hover:cursor-pointer overflow-hidden' key={item._id}>
            <div className='overflow-hidden'>
              <Image 
                src={item.image} 
                className='m-0 p-0 w-full h-60 object-cover hover:scale-105 duration-200' 
                width={200} 
                height={200} 
                alt={item.name || 'Category image'} 
              />
            </div>
              <h2 className='text-center text-white py-2 font-semibold bg-gray-800'>{item.name}</h2>
          </div>
        ))}
      </div>
    </section>

    <section>
        {isLoading ? <Loading/> : 

          products.length > 0 ? <ProductCard data={products}/> : 
          
          <h1 className='text-3xl text-center my-10'> There are no products </h1>
          
          }

    </section>
  </div>

  </>
    
  
}
