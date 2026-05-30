import { NextResponse } from "next/server";
import { getAllSearchItems, scoreAndFilter } from "@/lib/search-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim();

  const items = getAllSearchItems();
  const results = scoreAndFilter(items, q, 30);

  return NextResponse.json(results, {
    headers: { "Cache-Control": "no-store" },
  });
}
