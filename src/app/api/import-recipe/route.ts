import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "~/lib/auth";
import { scrapeAndCreateRecipe } from "~/lib/scrapeAndCreateRecipe";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: "No URL provided" },
        {
          status: 400,
        },
      );
    }

    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "User not logged in" },
        {
          status: 401,
        },
      );
    }

    const createdRecipe = await scrapeAndCreateRecipe(url, userId);

    return NextResponse.json({ recipe: createdRecipe });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
