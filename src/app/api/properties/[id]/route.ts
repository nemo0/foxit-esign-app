import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const client = await clientPromise;
  const db = client.db("foxit");
  const id = new ObjectId(params.id);

  const property = await db.collection("properties").findOne({
    _id: id,
  });

  return NextResponse.json({
    message: "Property fetched successfully",
    property: property,
  });
}
