import { connectDB } from "@/lib/db";
import { Company } from "@/models/Company";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id?: string } }
) {
  await connectDB();

  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ message: "Unauthorized: No token" }), {
      status: 401,
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify JWT token
    jwt.verify(token, process.env.JWT_SECRET as string);

    // Check if ID exists in the route
    if (!params?.id) {
      return new Response(JSON.stringify({ message: "No ID provided" }), {
        status: 400,
      });
    }

    // Extract new status
    const { status } = await req.json();
    if (!status || !["Target", "Not Target"].includes(status)) {
      return new Response(
        JSON.stringify({ message: "Invalid or missing status" }),
        { status: 400 }
      );
    }

    // Update the company
    const updatedCompany = await Company.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    if (!updatedCompany) {
      return new Response(JSON.stringify({ message: "Company not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        message: "Status updated successfully",
        company: updatedCompany,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Update error:", error);
    return new Response(
      JSON.stringify({ message: "Invalid token or server error" }),
      { status: 401 }
    );
  }
}
