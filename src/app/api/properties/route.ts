import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { nextauthOptions } from "@/lib/nextauthOptions";
import clientPromise from "@/lib/mongodb";

interface RequestBody {
  propertyAddress: string;
  monthlyRent: string;
  leaseApplicationFee: string;
  reservationFee: string;
  propertyOwner: string;
  listedBy: string;
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(nextauthOptions);

    if (!session?.user) {
      return NextResponse.json(
        {
          error: "You are not logged in.",
        },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const properties = client.db(process.env.DB_NAME).collection("properties");

    const data = await request.json();

    const property = await properties.insertOne({
      ...data,
      propertyOwner: session?.user?.email,
    });

    return NextResponse.json({
      message: "Property created successfully",
      property,
    });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const properties = client.db(process.env.DB_NAME).collection("properties");

    const allProperties = await properties.find({}).toArray();

    return NextResponse.json({
      message: "Properties fetched successfully",
      properties: allProperties,
    });
  } catch (error) {
    return NextResponse.error();
  }
}
