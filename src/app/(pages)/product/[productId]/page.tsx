import AddToCart from "@/components/AddToCart";
import ProductCard from "@/components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product, ProductResponse } from "@/interfaces/productInterface";
import { Params } from "next/dist/server/request/params";
import Image from "next/image";
import React from "react";

export const dynamic = 'force-dynamic';

export default async function ProductDetails({ params }: { params: Params }) {
  const { productId } = await params;

  const productResponse = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products/" + productId,
    { cache: 'no-store' }
  );
  const { data: product }: { data: Product } = await productResponse.json();

  const relatedProductsResponse = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${product.category._id}`,
    { cache: "no-store" }
  );
  const { data: relatedProducts }: ProductResponse = await relatedProductsResponse.json();
  const topRelatedProducts = relatedProducts
    .filter((item) => item._id !== product._id)
    .slice(0, 4);

  return (
    <>
      <section className="my-8 sm:my-10 lg:my-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-15 lg:gap-20 items-start rounded-2xl px-4 sm:px-6 lg:px-10 py-4 sm:py-5 lg:py-5">
          <div className="col-span-1 md:col-span-1 lg:col-span-2 m-10">
            <Carousel>
              <CarouselContent>
                {product.images.map((item, index) => (
                  <CarouselItem key={index}>
                    {" "}
                    <Image
                      className="w-full"
                      src={item}
                      width={400}
                      height={400}
                      alt=""
                    />{" "}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="col-span-1 md:col-span-1 lg:col-span-3 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="flex">
                {[...Array(Math.round(product.ratingsAverage))].map(
                  (_, index) => (
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
                  )
                )}
                {[...Array(5 - Math.round(product.ratingsAverage))].map(
                  (_, index) => (
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
                  )
                )}
              </div>
              <span className="text-gray-600">
                ({product.ratingsQuantity} customer reviews)
              </span>
            </div>
            <h1 className="mb-3 font-semibold text-lg sm:text-xl lg:text-2xl"> {product.title} </h1>
            <p className="text-gray-500"> {product.description} </p>
            <h2>{product.brand.name} </h2>
            <h2 className="font-bold text-lg sm:text-xl lg:text-2xl">EGP {product.price} </h2>
            <h2 className="font-bold text-sm sm:text-base lg:text-lg">{product.quantity} In Stock </h2>
            <div className="flex flex-row sm:items-center gap-3 sm:gap-2">
              <div className="flex space-x-4 sm:space-x-10 border-2 px-3 sm:px-4 py-2 sm:py-3 rounded-md">
                <button className=" font-bold text-sm sm:text-base">-</button>
                <span className=" font-semibold text-sm sm:text-base">1</span>
                <button className=" font-bold text-sm sm:text-base">+</button>
              </div>

              <div className="w-full flex flex-1 sm:flex-initial space-x-3 sm:space-x-10 h-10 sm:h-12 rounded-md">

                <AddToCart productId={product._id} />
              
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 fill-white hover:cursor-pointer duration-100 hover:text-red-500 hover:fill-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {topRelatedProducts.length > 0 && (
        <section className="my-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">

                <h2 className="text-2xl font-semibold sm:text-3xl">Related Products</h2>

            </div>

            <ProductCard data={topRelatedProducts} />
          </div>
        </section>
      )}
    </>
  );
}
