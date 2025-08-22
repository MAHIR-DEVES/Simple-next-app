import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;

  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    const client = await connectToDatabase();
    const db = client.db(dbName);
    const users = db.collection("users");

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    await users.insertOne(user);

    return NextResponse.json({ message: "User created", user: { email: user.email } });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}