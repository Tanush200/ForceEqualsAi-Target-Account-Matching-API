import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { Company } from "@/models/Company";
import bcrypt from "bcryptjs";

(async () => {
  await connectDB();
  const hashed = await bcrypt.hash("pass123", 10);
  await User.create({ username: "user1", password: hashed });

  await Company.create([
    { name: "Company A", matchScore: 85 },
    { name: "Company B", matchScore: 72 },
    { name: "Company C", matchScore: 94 },
  ]);

  console.log("Seeded");
})();
