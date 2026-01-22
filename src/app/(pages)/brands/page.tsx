import { Brand } from "@/interfaces/productInterface";
import Image from "next/image";
import React from "react";

export const dynamic = 'force-dynamic';

export default async function Brands() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-brands`, { cache: 'no-store' });

  const { data }: { data: Brand[] } = await response.json();

  console.log(response);
  

  return (
    <>
      <section className="my-10">
        <div className="container mx-auto">
          <h1 className="text-6xl font-bold mb-10 text-center">All Brands</h1>
          <div className="grid grid-cols-5 gap-5">
            {data.map((brand) => (
              <div key={brand._id} className="  ">
                <div className="hover:cursor-pointer">
                  <Image
                  className=" w-full border-gray-500  border-2 rounded-xl opacity-50 hover:opacity-100"
                    src={brand.image}
                    alt={brand.name}
                    width={300}
                    height={300}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
