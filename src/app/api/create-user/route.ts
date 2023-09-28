import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import axios from "axios";

interface RequestBody {
  firstName: string;
  lastName: string;
  emailId: string;
  address: string;
  userRole: string;
  department: string;
  title: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const users = client.db(process.env.DB_NAME).collection("users");

    const data = await request.json();

    const {
      firstName,
      lastName,
      emailId,
      address,
      userRole,
      department,
      title,
      password,
    }: RequestBody = data;

    if (!password) {
      throw new Error("Password is required");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await users.insertOne({
      firstName,
      lastName,
      email: emailId,
      password: hashedPassword,
      address,
      role: userRole,
      department,
      title,
    });

    const foxitResponse = await axios.post(
      `https://na1.foxitesign.foxit.com/api/users/create`,
      {
        allowAdvancedEmailValidation: false,
        user: {
          firstName: firstName,
          lastName: lastName,
          emailId: emailId,
          address: address,
          userRole: userRole,
          department: department,
          title: title,
          loginPassword: password,
          sendMailForPasswordReset: true,
          share_among_department: true,
          userSecureFieldAccess: false,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.FOXIT_API_KEY}`,
        },
      }
    );

    return NextResponse.json({
      success: true,
      foxitResponse: foxitResponse.data,
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error: error.message });
  }
}
