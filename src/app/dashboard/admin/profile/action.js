"use server";

import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { UserModel } from "@/lib/models/userModel";
import bcrypt from "bcryptjs";
import path from "path";
import fs from "fs";
import { deleteImageOnCloudinary, uploadOnCloudinary } from "@/lib/helpers/cloudinary";
import mailer from "@/lib/helpers/nodeMailer";
import { cookies } from "next/headers";

export const ProfileAction = async (formData) => {

  let name = formData.get("name");
  let email = formData.get("email");
  let password = formData.get("password");
  //for image
  let file = formData.get("file");

  try {
    await dbConnect();
    const userExist = await UserModel.findOne({ email });
    if (!userExist) {
      return { message: "User not found" };
    }

    if (file?.size) {
      userExist.picture?.public_id &&
        (await deleteImageOnCloudinary(userExist.picture?.public_id));
        let bufferData = await file.arrayBuffer();
        let buffer = Buffer.from(bufferData);
        const fileName = Date.now() + "-" + path.extname(file.name);
        let filePath = `./public/${fileName}`;
        fs.writeFileSync(filePath, buffer);
      let { secure_url, public_id } = await uploadOnCloudinary(filePath, "blognextprofile");
      userExist.picture = { secure_url, public_id };
      }
      if (name) userExist.name = name;
      if (password) userExist.password = await bcrypt.hash(password, 10);

      (await cookies()).delete("token"); 
      (await cookies()).delete("userInfo"); 
      await userExist.save()
      
      // console.log(userExist);
    let credential = {
      email,
      subject: "Profile Update ",
      body: `<h2>Hi ${userExist?.name},</h2>
      <h3>Your profile has been Updated successfully.
      Thanks for staying with us`,
    };
    mailer(credential);
    return {
      success: true,
      message: `Profile Update successful, Please login again`,
    };
  } catch (error) {
    file?.size && fs.unlinkSync(filePath);
    console.log(error);
    return { message: await getErrorMessage(error) };
  }

};
