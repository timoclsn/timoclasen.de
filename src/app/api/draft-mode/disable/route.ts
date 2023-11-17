import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export const GET = async () => {
  draftMode().disable();
  redirect("/");
};
