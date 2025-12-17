import { getUserToken } from "@/Helpers/getUserToken";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await getUserToken();

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      headers: { token },
      cache: "no-store", // 🔥 important
    }
  );

  const text = await response.text();

  if (!response.ok || !text) {
    return NextResponse.json(
      { message: "Failed to fetch cart", raw: text },
      { status: response.status }
    );
  }

  return NextResponse.json(JSON.parse(text));
}
