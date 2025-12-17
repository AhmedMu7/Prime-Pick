import { ProductResponse } from "@/interfaces/productInterface";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products",
    {
      method: "GET",
    }
  );
  const data: ProductResponse = await response.json();

  return NextResponse.json(data);
}
