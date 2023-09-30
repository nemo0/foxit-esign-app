import { nextauthOptions } from "@/lib/nextauthOptions";
import { getServerSession } from "next-auth/next";
import PropertyForm from "@/components/PropertyForm";
import React from "react";
import { redirect } from "next/navigation";

export default async function CreateProperty() {
  const session = await getServerSession(nextauthOptions);

  if (!session?.user) {
    const url = new URL("/api/auth/signin", "http://localhost:3000");
    url.searchParams.append("callbackUrl", "/properties/create");
    redirect(url.toString());
  }

  return (
    <div>
      <PropertyForm />
    </div>
  );
}
