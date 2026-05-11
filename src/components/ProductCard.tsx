import { Product } from '@/interfaces/productInterface'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AddToCart from './AddToCart'
import AddtoWishList from './AddtoWishList'

export default function ProductCard({data} : {data:Product[]}) {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((product) => (
          <div
            key={product._id}
            className="group flex flex-col rounded-lg overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Image Section */}
            <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square">
              <Link href={"/product/" + product._id}>
                <Image
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  src={product.imageCover}
                  width={300}
                  height={300}
                  alt={product.title}
                  priority
                />
              </Link>

              {/* Stock Badge */}
              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    product.quantity > 0
                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                  }`}
                >
                  {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-1 p-4 space-y-3">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(Math.round(product.ratingsAverage))].map((_, index) => (
                    <svg
                      key={`filled-${index}`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4 text-yellow-500 fill-yellow-500"
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
                      key={`empty-${index}`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4 text-gray-300 dark:text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  ({product.ratingsAverage})
                </span>
              </div>

              {/* Brand */}
              <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold uppercase tracking-wide">
                {product.brand.name}
              </p>

              {/* Title */}
              <Link href={"/product/" + product._id} className="w-fit group/title">
                <h3 className="line-clamp-2 font-semibold text-gray-900 dark:text-white text-sm group-hover/title:text-teal-600 dark:group-hover/title:text-teal-400 transition-colors">
                  {product.title}
                </h3>
              </Link>

              {/* Description */}
              <p className="line-clamp-2 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>

              {/* Spacer */}
              <div className="flex-1"></div>

              {/* Price */}
              <div className="py-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  EGP {product.price}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">

                  <AddToCart productId={product._id} />

                  <AddtoWishList productId={product._id} />

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
