import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import axios from "axios";
import { CreateUserRequestBody } from "@/components/SignUp";

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
      password,
    }: CreateUserRequestBody = data;

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
    });

    const foxitResponse = await axios.post(
      `${process.env.FOXIT_BASE_URL}/users/create`,
      {
        allowAdvancedEmailValidation: false,
        user: {
          firstName: firstName,
          lastName: lastName,
          emailId: emailId,
          address: address,
          loginPassword: password,
          sendMailForPasswordReset: true,
          share_among_department: true,
          userSecureFieldAccess: false,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.FOXIT_ACCESS_TOKEN}`,
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
