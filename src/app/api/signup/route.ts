import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  const { username, password } = await req.json();

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return new Response(
      JSON.stringify({ message: "Username already exists" }),
      {
        status: 400,
      }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashedPassword,
  });

  return new Response(JSON.stringify({ message: "User created", user }), {
    status: 201,
  });
}
