import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

let latestWebhookData: any = null;

export async function POST(request: Request) {
  const body = await request.json();

  const client = await clientPromise;
  const properties = client.db(process.env.DB_NAME).collection("properties");

  // Add isLeased field to property
  const property = await properties.findOneAndUpdate(
    { _id: new ObjectId(body.data.folder.custom_field1.value) },
    { $set: { isLeased: true } }
  );

  // Add latest webhook data
  latestWebhookData = property;

  return new Response(JSON.stringify(property), {
    status: 200,
  });
}

export async function GET(request: Request) {
  if (latestWebhookData) {
    return new Response(JSON.stringify(latestWebhookData), {
      status: 200,
    });
  } else {
    return new Response(
      JSON.stringify({
        error: "No webhook data found",
      }),
      {
        status: 404,
      }
    );
  }
}
