import MyBlogPage from "@/lib/components/MyBlogPage";

const MyBlogs = async ({ searchParams }) => {
  return (
    <div>
      <MyBlogPage searchParams={searchParams} />
    </div>
  );
};

export default MyBlogs;
