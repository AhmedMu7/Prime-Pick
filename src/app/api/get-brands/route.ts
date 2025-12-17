import { Brand } from "@/interfaces/productInterface";
import { NextResponse } from "next/server";

export async function GET(){


  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/brands",
    {
      method: "GET",
    }
  );

  const { data }: { data: Brand[] } = await response.json();

  return NextResponse.json({data});

}