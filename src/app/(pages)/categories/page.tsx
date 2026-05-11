"use client";

import Loading from "@/app/loading";
import ProductCard from "@/components/ProductCard";
import { Category, Product } from "@/interfaces/productInterface";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  async function getCategories() {
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/categories",
        {
          method: "GET",
        },
      );

      const { data } = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function getCategoryProducts(categoryId: string) {
    setProducts([]);
    setSelectedCategory(categoryId);
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/get-categoryProducts?category=${categoryId}`,
      );
      const data = await response.json();
      if (data.results && data.results > 0) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getAllProducts() {
    setProducts([]);
    try {
      setIsLoading(true);
      const response = await fetch("/api/get-products");
      const data = await response.json();

      if (data.results && data.results > 0) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Error fetching all products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getSubCategoies() {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/subcategories",
      {
        method: "GET",
      },
    );

    const data = await response.json();
  }

  useEffect(() => {
    getCategories();
    getAllProducts();
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-8 sm:py-12 lg:py-16">
      {/* Header Section */}
      <section className="mb-12 sm:mb-16 container mx-auto px-4">
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Shop by Category
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Browse our collection of products organized by category
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mb-16 sm:mb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5 lg:gap-6">
            {categories.map((item) => (
              <button
                onClick={() => getCategoryProducts(item._id)}
                key={item._id}
                className={`group flex flex-col rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === item._id
                    ? "ring-2 ring-teal-600 shadow-lg"
                    : "hover:shadow-lg"
                }`}
              >
                <div className="relative overflow-hidden bg-gray-200 dark:bg-gray-800 aspect-square">
                  <Image
                    src={item.image}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    width={300}
                    height={300}
                    alt={item.name || "Category image"}
                    priority
                  />
                  {selectedCategory === item._id && (
                    <div className="absolute inset-0 bg-teal-600/20"></div>
                  )}
                </div>
                <div
                  className={`py-3 sm:py-4 px-2 text-center font-semibold transition-colors ${
                    selectedCategory === item._id
                      ? "bg-teal-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white group-hover:bg-teal-500 group-hover:text-white"
                  }`}
                >
                  <p className="text-xs sm:text-sm line-clamp-2">{item.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4">
        {isLoading ? (
          <Loading />
        ) : products.length > 0 ? (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {selectedCategory
                  ? `Products in ${categories.find((c) => c._id === selectedCategory)?.name}`
                  : "All Products"}
              </h2>
            </div>
            <ProductCard data={products} />
          </div>
        ) : selectedCategory ? (
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
                d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
              />
            </svg>

            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              No Products Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              This category doesn&apos;t have any products yet. Try another
              category.
            </p>
          </div>
        ) : (
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
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Select a Category
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Choose a category above to view products
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
