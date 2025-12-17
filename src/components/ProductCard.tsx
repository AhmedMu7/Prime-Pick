import { Product } from '@/interfaces/productInterface'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AddToCart from './AddToCart'
import AddtoWishList from './AddtoWishList'

export default function ProductCard({data} : {data:Product[]}) {
  return <>
  
  <div className=" container mx-auto grid md:grid-cols-2 lg:grid-cols-4">
          {data.map((product) => (
            <div className=" space-y-3 p-4 border-2 dark:shadow-gray-800 dark:bg-gray-900 rounded-md m-2 duration-200" key={product._id}>
                <div className="overflow-hidden hover:cursor-pointer">
              <Link href={"/product/" + product._id}>
                  <Image
                    className="hover:scale-110 duration-200 w-full"
                    src={product.imageCover}
                    width={300}
                    height={300}
                    alt={product.title}
                  />
              </Link>
                </div>
              <span className="flex items-center">
                {[...Array(Math.round(product.ratingsAverage))].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 text-yellow-600 fill-yellow-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                ))}
                {[...Array(5 - Math.round(product.ratingsAverage))].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 text-gray-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                ))}
                <span className='ms-2'>{product.ratingsAverage}</span>
              </span>

              <h2 className="line-clamp-1 font-medium text-sm">
                {" "}
                {product.title}{" "}
              </h2>


              <h2 className="line-clamp-1 text-gray-500 text-sm">
                {" "}
                {product.brand.name}{" "}
              </h2>


                <h2 className="font-bold text-xl">EGP {product.price}</h2>
                <div className="flex items-center space-x-2">

                  <AddToCart productId={product._id} />
                  <AddtoWishList productId={product._id} />
                </div>
            </div>
          ))}
        </div>

  </>
}
