// export const dynamic = "force-static";

import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { PostModel } from "@/lib/models/PostModel";
import { UserModel } from "@/lib/models/userModel";
import dbConnect from "@/lib/helpers/dbConnect";

export async function GET(req) {
  let keyword = req.nextUrl.searchParams.get("keyword");
  try {
    await dbConnect();
    let author = await UserModel.find({
      name: { $regex: keyword, $options: "i" },
    });
    let authIdArr = author?.length && (await author.map((item) => item._id));
    const postList = await PostModel.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { post: { $regex: keyword, $options: "i" } },
        { user: authIdArr?.length && authIdArr },
      ],
    })
      .populate("user", "-password")
      .sort({ createdAt: -1 });
    return Response.json(postList);
  } catch (error) {
    console.log(error);
    return { message: await getErrorMessage(error) };
  }
}
