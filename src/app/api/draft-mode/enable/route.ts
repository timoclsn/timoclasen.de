import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const CONTENTFUL_PREVIEW_SECRET = z
  .string()
  .parse(process.env.CONTENTFUL_PREVIEW_SECRET);

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (secret !== CONTENTFUL_PREVIEW_SECRET || !slug) {
    return new Response("Invalid secret or slug", { status: 401 });
  }

  draftMode().enable();
  redirect(slug);
};
