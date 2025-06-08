import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

const { CONTENTFUL_PREVIEW_SECRET } = process.env;

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (secret !== CONTENTFUL_PREVIEW_SECRET || !slug) {
    return new Response("Invalid secret or slug", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();
  redirect(slug);
};
