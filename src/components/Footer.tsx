import React from "react";

export default function Footer() {
  return (
    <>
      <section className="mt-20 border-t border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold sm:text-4xl">PrimePick</h1>
              <p className="max-w-md text-sm leading-6 text-gray-600 dark:text-gray-400 sm:text-base">
                A clean shopping experience with fast browsing, easy checkout, and products you can trust.
              </p>

              <div className="flex flex-wrap gap-3 pt-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="rounded-full border border-gray-300 px-3 py-1 dark:border-gray-700">Fast delivery</span>
                <span className="rounded-full border border-gray-300 px-3 py-1 dark:border-gray-700">Secure payment</span>
                <span className="rounded-full border border-gray-300 px-3 py-1 dark:border-gray-700">Easy returns</span>
              </div>
            </div>

            <div>
              <h2 className="mb-4 font-semibold  text-gray-900 dark:text-white">
                Company
              </h2>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 [&>li]:w-fit [&>li]:cursor-pointer [&>li]:transition-colors [&>li:hover]:text-teal-600">
                <li>About company</li>
                <li>Our team</li>
                <li>Careers</li>
                <li>Contact us</li>
                <li>News</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4  font-semibold text-gray-900 dark:text-white">
                Account
              </h2>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 [&>li]:w-fit [&>li]:cursor-pointer [&>li]:transition-colors [&>li:hover]:text-teal-600">
                <li>Your account</li>
                <li>Shipping rates & policies</li>
                <li>Refunds & replacements</li>
                <li>Delivery info</li>
                <li>Order tracking</li>
                <li>Taxes & fees</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 font-semibold  text-gray-900 dark:text-white">
                Customer service
              </h2>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 [&>li]:w-fit [&>li]:cursor-pointer [&>li]:transition-colors [&>li:hover]:text-teal-600">
                <li>Payment methods</li>
                <li>Money back guarantee</li>
                <li>Product returns</li>
                <li>Support center</li>
                <li>Shipping</li>
                <li>Term and conditions</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-gray-200 pt-6 text-center text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p>© 2026 PrimePick. All rights reserved.</p>
            <p>Built for a smooth shopping experience.</p>
          </div>
        </div>
      </section>
    </>
  );
}
