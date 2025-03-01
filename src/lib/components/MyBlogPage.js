import * as motion from "motion/react-client";
import Card from "@/lib/components/postCard";
import { getTokenData } from "@/lib/helpers/getTokenData";
import { getCookieValue } from "@/lib/helpers/helperFunction";
import { Axios } from "@/lib/helpers/AxiosInstance";

const MyBlogPage = async () => {
  let userInfo = await getTokenData(await getCookieValue("token"));
  let res = await fetch(
    `${process.env.BASE_URL}/api/logged-user-posts?userId=${userInfo?._id}`,
    {
      cache: "force-cache",
    }
  );
  // let { data } = await Axios.get(`/api/logged-user-posts`, {
  //   params: { userId: userInfo?._id },
  // });
  let postList = await res.json();
  // let postList = data;
  // console.log(data);
  // let { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
  let entries = postList;
  return (
    <div className="p-2">
      <h4>
        Author Name: {userInfo?.name} ({postList?.length}){" "}
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
    </div>
  );
};

export default MyBlogPage;
