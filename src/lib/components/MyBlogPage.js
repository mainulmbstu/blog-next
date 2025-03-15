import * as motion from "motion/react-client";
import Card from "@/lib/components/postCard";
import { getTokenData } from "@/lib/helpers/getTokenData";
import { getCookieValue } from "@/lib/helpers/helperFunction";
import Pagination from "./pagination";

const MyBlogPage = async ({ searchParams }) => {
  let spms = await searchParams;
  // let keyword = (await spms["keyword"]) ?? "";
  let page = Number((await spms["page"]) ?? "1");
  let perPage = Number((await spms["perPage"]) ?? "12");
  let userInfo = await getTokenData(await getCookieValue("token"));
  let res = await fetch(
    `${process.env.BASE_URL}/api/logged-user-posts?userId=${userInfo?._id}&page=${page}&perPage=${perPage}`
    // {
    //   cache: "force-cache",
    // }
  );
  // let { data } = await Axios.get(`/api/logged-user-posts`, {
  //   params: { userId: userInfo?._id },
  // });
  let data = await res.json();
  // let postList = data;
  // console.log(data);
  // let { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
  let entries = data?.postList;
  return (
    <div className="p-2">
      <h4>
        Author Name: {userInfo?.name} ({data?.total}){" "}
      </h4>
      <div className="grid md:grid-cols-4 gap-6">
        {entries?.length ? (
          entries.map((item) => (
            <motion.div
              key={item._id}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 100,
              }}
            >
              <Card item={item} />
            </motion.div>
          ))
        ) : (
          <p>No data found</p>
        )}
      </div>
      <div className=" mt-3 ">
        <Pagination total={data?.total} page={page} perPage={perPage} />{" "}
      </div>
    </div>
  );
};

export default MyBlogPage;
