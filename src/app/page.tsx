
import { ProductResponse } from "@/interfaces/productInterface";
import Link from "next/link";
import CarouselHomeSection from "@/components/Carousel";
import ProductCard from "@/components/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const dynamic = 'force-dynamic';

type HomeProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

function getVisiblePages(currentPage: number, totalPages: number, maxVisible = 5) {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, currentPage - half);
  const end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const requestedPage = Number.parseInt(params?.page ?? "1", 10);
  const page = Number.isNaN(requestedPage) || requestedPage < 1 ? 1 : requestedPage;
  const limit = 12;

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?limit=${limit}&page=${page}`,
    {
      method: "GET",
    }
  );
  const { data, metadata }: ProductResponse = await response.json();
  const currentPage = metadata?.currentPage ?? page;
  const totalPages = metadata?.numberOfPages ?? 1;
  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <>

    <main className="space-y-16 lg:space-y-20 mt-6 lg:mt-8">

      <section>
        <div className="container bg-gray-200 dark:bg-gray-700 mx-auto rounded-2xl overflow-hidden">
          <CarouselHomeSection />
        </div>
      </section>

      <section >
        <div className="container mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-16 sm:size-20 bg-gray-200 dark:bg-gray-800 p-4 sm:p-5 rounded-full shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
            <div>
              <h3 className="font-semibold">Free Shipping & Returns</h3>
              <span className="text-gray-500">For all orders over $199.00</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-16 sm:size-20 bg-gray-200 dark:bg-gray-800 p-4 sm:p-5 rounded-full shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
              />
            </svg>

            <div>
              <h3 className="font-semibold">Secure Payment</h3>
              <span className="text-gray-500">We ensure secure payment</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-16 sm:size-20 bg-gray-200 dark:bg-gray-800 p-4 sm:p-5 rounded-full shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>

            <div>
              <h3 className="font-semibold">Money Back Guarantee</h3>
              <span className="text-gray-500">Returning money 30 days</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-16 sm:size-20 bg-gray-200 dark:bg-gray-800 p-4 sm:p-5 rounded-full shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </svg>

            <div>
              <h3 className="font-semibold">24/7 Customer Support</h3>
              <span className="text-gray-500">Friendly customer support</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <ProductCard data={data}/>

        <div className="container mx-auto my-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`/?page=${Math.max(1, currentPage - 1)}`}
                  aria-disabled={currentPage <= 1}
                  className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {visiblePages.map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href={`/?page=${pageNumber}`}
                    isActive={pageNumber === currentPage}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href={`/?page=${Math.min(totalPages, currentPage + 1)}`}
                  aria-disabled={currentPage >= totalPages}
                  className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <div className="container mx-auto flex justify-center items-center my-5">
          <Link className="font-semibold text-xl bg-gray-800 text-white px-5 py-3 rounded-md" href={"/categories"}> Browse categories</Link>
        </div>
      </section>
    </main>
    </>
  );
}
