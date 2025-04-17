import { connectDB } from "@/lib/db";
import { Company } from "@/models/Company";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();
  const authHeader = req.headers.get("authorization");
  if (!authHeader)
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });

  try {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET as string);
    const companies = await Company.find();
    return new Response(JSON.stringify(companies));
  } catch {
    return new Response(JSON.stringify({ message: "Invalid token" }), {
      status: 401,
    });
  }
}
