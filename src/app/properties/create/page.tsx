import { nextauthOptions } from "@/lib/nextauthOptions";
import { getServerSession } from "next-auth/next";
import PropertyForm from "@/components/PropertyForm";
import React from "react";
import { redirect } from "next/navigation";

export default async function CreateProperty() {
  const session = await getServerSession(nextauthOptions);

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div>
      <PropertyForm />
    </div>
  );
}
