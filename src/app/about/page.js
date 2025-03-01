"use client";

import { CldUploadWidget } from "next-cloudinary";

// export const metadata = {
//   title: "about",
//   description: "about page",
// };

const About = () => {
  // await new Promise((resolve) => {
  //   setTimeout(() => resolve(), 10000);
  // });
  return (
    <div className="">
    <h2>About</h2>
      {/* <CldUploadWidget
        uploadPreset="preset1"
        onSuccess={({ event, info }) => {
          if (event === "success") {
            console.log(event, info);
          }
        }}
      >
        {({ open }) => {
          return (
            <button className="btn btn-accent" onClick={() => open()}>
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget> */}
    </div>
  );
};

export default About;
