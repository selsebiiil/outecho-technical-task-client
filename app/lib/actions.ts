"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { signOut } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export const customRevalidateTag = async (id: number) => {
  revalidatePath(`/topics/${id}`);
  redirect(`/topics/${id}`);
};

export const signOutCallback = async () => {
  try {
    await signOut({ callbackUrl: "/login" });
  } catch (e) {}
};
