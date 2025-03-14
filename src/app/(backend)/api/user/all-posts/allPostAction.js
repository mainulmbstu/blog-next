"use server";

import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { PostModel } from "@/lib/models/PostModel";
import { UserModel } from "@/lib/models/userModel";

export const allPostAction = async (keyword, page = 1, perPage) => {
  let skip = (page - 1) * perPage;
  // let limit = page * perPage;
  try {
    await dbConnect();
    let author = await UserModel.find({
      name: { $regex: keyword, $options: "i" },
    });
    let authIdArr = author?.length && (await author.map((item) => item._id));
    const total = await PostModel.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { post: { $regex: keyword, $options: "i" } },
        { user: authIdArr?.length && authIdArr },
      ],
    });
    const postList = await PostModel.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { post: { $regex: keyword, $options: "i" } },
        { user: authIdArr?.length && authIdArr },
      ],
    })
      .populate("user", "-password")
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: -1 });
    return { postList, total: total?.length };
  } catch (error) {
    console.log(error);
    return { message: await getErrorMessage(error) };
  }
};
