import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const collection = await dbConnect("products");
    const product = await collection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return new Response(JSON.stringify({ success: false, message: "Product not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
