import { Brand } from "@/interfaces/productInterface";
import Image from "next/image";
import React from "react";

export const dynamic = 'force-dynamic';

export default async function Brands() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-brands`, { cache: 'no-store' });

  const { data }: { data: Brand[] } = await response.json();

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-8 sm:py-12 lg:py-16">
      {/* Header Section */}
      <section className="mb-12 sm:mb-16 container mx-auto px-4">
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            All Brands
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Discover all the premium brands available in our store
          </p>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {data.map((brand) => (
            <div
              key={brand._id}
              className="group flex flex-col rounded-lg overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500 transition-all duration-300 hover:shadow-lg dark:hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden dark:bg-gray-700 aspect-square flex items-center justify-center p-4">
                <Image
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  src={brand.image}
                  alt={brand.name}
                  width={300}
                  height={300}
                  priority
                />
              </div>

              {/* Brand Name */}
              <div className="p-4 text-center border-t border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-white dark:from-gray-750 dark:to-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {brand.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {data.length === 0 && (
          <div className="py-16 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-16 mx-auto mb-4 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m0 0C5.25 5.547 8.944 5 12 5c3.057 0 6.75.547 9 1.375"
              />
            </svg>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              No Brands Available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              We&apos;ll be adding brands soon. Check back later!
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
