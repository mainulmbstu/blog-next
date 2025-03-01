// import { userListAction } from "./action";
import Pagination from "@/lib/components/pagination";
import Form from "next/form";
import Link from "next/link";
import { Axios } from "@/lib/helpers/helperFunction";
import Card from "@/lib/components/postCard";

const AuthorPage = async ({ searchParams }) => {
  let spms = await searchParams;
  let authorId = (await spms["authorId"]) ?? "";
  let page = Number((await spms["page"]) ?? "1");
  let perPage = Number((await spms["perPage"]) ?? "30");
  // let start=(Number(page)-1)*Number(perPage)
  let start = (page - 1) * perPage;
  let end = page * perPage;

  // let userList = await userListAction(keyword);
  let res = await fetch(
    `${process.env.BASE_URL}/api/user/author-posts?authorId=${authorId}`,
    {
      cache: "force-cache",
    }
  );
  let { postList, author } = await res.json();
  // let { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
  let totalPage = Math.ceil(postList?.length / perPage);
  let entries = postList?.slice(start, end);
  return (
    <div className="p-2">
      <h4>Total posts found {postList?.length} </h4>
      <h4>Author Name: {author?.name} </h4>
      <div className="grid md:grid-cols-4 gap-6">
        {entries?.length ? (
          entries.map((item) => <Card key={item._id} item={item} />)
        ) : (
          <p>No data found</p>
        )}
      </div>
      <div className=" mt-3 ">
        <Pagination
          totalPage={totalPage}
          page={page}
          perPage={perPage}
          spms1="authorId"
          spms1Value={authorId}
        />{" "}
      </div>
    </div>
  );
};

export default AuthorPage;
