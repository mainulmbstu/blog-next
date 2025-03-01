import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { PostModel } from "@/lib/models/PostModel";
import { UserModel } from "@/lib/models/userModel";

export async function GET(req) {
  let authorId = req.nextUrl.searchParams.get("authorId");
  try {
    await dbConnect();

    const postList = await PostModel.find({ user: authorId }).populate(
      "user",
      "-password"
    );
    const author = await UserModel.findById(authorId, { password: 0 }).sort({
      createdAt: -1,
    });

    return Response.json({ postList, author });
  } catch (error) {
    console.log(error);
    return { message: await getErrorMessage(error) };
  }
}
