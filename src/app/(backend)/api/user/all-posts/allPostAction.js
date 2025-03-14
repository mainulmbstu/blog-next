"use server";

import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { PostModel } from "@/lib/models/PostModel";
import { UserModel } from "@/lib/models/userModel";

export const allPostAction = async (keyword, page = 1, perPage) => {
  let skip = (page - 1) * perPage;
  let limit = page * perPage;
  console.log(page, skip, limit);
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
    let totalPage = Math.ceil(total?.length / perPage);
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
    console.log(postList.length);
    return { postList, total: total?.length, totalPage };
  } catch (error) {
    console.log(error);
    return { message: await getErrorMessage(error) };
  }
};
