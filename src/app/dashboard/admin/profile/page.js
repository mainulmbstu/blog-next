import React from "react";
import Profile from "@/lib/components/Profile";

export const metadata = {
  title: "Profile",
  description: "Profile page",
};
const AdminProfile = async () => {
  return (
    <div>
      <Profile />
    </div>
  );
};

export default AdminProfile;
