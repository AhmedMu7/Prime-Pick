import { ProductResponse } from "@/interfaces/productInterface";
import { NextResponse } from "next/server";


export async function GET(request : Request){

    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("category");

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`,
    {
      method: "GET",
        
    }
  );
  const data: ProductResponse = await response.json();


  return NextResponse.json(data);

}