import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { PostModel } from "@/lib/models/PostModel";
import { UserModel } from "@/lib/models/userModel";

export async function GET(req) {
  let keyword = req.nextUrl.searchParams.get("keyword");
  let page = req.nextUrl.searchParams.get("page");
  let perPage = 12;
  let skip = (page - 1) * perPage;
  let limit = page * perPage;
  try {
    await dbConnect();

    const total = await PostModel.find(
      keyword === "All-Category"
        ? {} // null
        : {
            categorySlug: { $regex: keyword, $options: "i" },
          }
    );
    let totalPage = Math.ceil(total?.length / perPage);
    const postList = await PostModel.find(
      keyword === "All-Category"
        ? {} // null
        : {
            categorySlug: { $regex: keyword, $options: "i" },
          }
    )
      .populate("user", "-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    return Response.json({ postList, total: total?.length, totalPage });
  } catch (error) {
    console.log(error);
    return { message: await getErrorMessage(error) };
  }
}
