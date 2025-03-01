import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { PostModel } from "@/lib/models/PostModel";
import dbConnect from "@/lib/helpers/dbConnect";

export async function GET(req) {
  let userId = req.nextUrl.searchParams.get("userId");
  try {
    await dbConnect();
    const postList = await PostModel.find({ user: userId })
      .populate("user", "-password")
      .sort({ createdAt: -1 });
    return Response.json(postList);
  } catch (error) {
    console.log(error);
    return { message: await getErrorMessage(error) };
  }
}
