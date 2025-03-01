// import { userListAction } from "./action";
import Pagination from "@/lib/components/pagination";
import { Axios, getCookieValue } from "@/lib/helpers/helperFunction";
import Card from "@/lib/components/postCard";

const CategoryPage = async ({ params, searchParams }) => {
  let token = await getCookieValue("token");
  let { category } = await params;
  let spms = await searchParams;
  let categoryName = (await spms["categoryName"]) ?? "";
  let page = Number((await spms["page"]) ?? "1");
  let perPage = Number((await spms["perPage"]) ?? "30");
  // let start=(Number(page)-1)*Number(perPage)
  let start = (page - 1) * perPage;
  let end = page * perPage;
  // console.log(spms);
  // let userList = await userListAction(keyword);
  let res = await fetch(
    `${process.env.BASE_URL}/api/user/my-blogs?token=${token}`
    // {
    //   cache: "force-cache",
    // }
  );
  let postList = await res.json();
  // let { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
  let totalPage = Math.ceil(postList?.length / perPage);
  let entries = postList?.slice(start, end).reverse();
  return (
    <div className="p-2">
      <h4>
        Category Name: {categoryName} ({postList?.length}){" "}
      </h4>
      <div className="overflow-x-auto grid md:grid-cols-4 gap-6">
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
          spms1="categoryName"
          spms1Value={categoryName}
        />{" "}
      </div>
    </div>
  );
};

export default CategoryPage;
