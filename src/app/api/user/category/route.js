import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { PostModel } from "@/lib/models/PostModel";
import { UserModel } from "@/lib/models/userModel";

export async function GET(req) {
  let keyword = req.nextUrl.searchParams.get("keyword");
  try {
    await dbConnect();

    const postList = await PostModel.find(
      keyword === "All-Category"
        ? {} // null
        : {
            categorySlug: { $regex: keyword, $options: "i" },
          }
    )
      .populate("user", "-password")
      .sort({ createdAt: -1 });
    return Response.json(postList);
  } catch (error) {
    console.log(error);
    return { message: await getErrorMessage(error) };
  }
}
