import dbConnect from "@/lib/dbConnect";


export async function POST(req) {
  try {
    const body = await req.json();
    const collection = await dbConnect("products");
    const result = await collection.insertOne(body);

    return Response.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

export async function GET() {
  try {
    const collection = await dbConnect("products");
    const products = await collection.find({}).toArray();

    return Response.json(products);
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}