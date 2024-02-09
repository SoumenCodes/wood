import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "./api/config";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    FetchPost();
  }, []);

  async function FetchPost() {
    try {
      await axios.get(`${API_URL}/posts`).then((res) => setPosts(res.data));
    } catch (error) {
      console.log(error);
    }
  }
  // function showData() {
  //   posts.map((post) => {
  //     console.log(post.image);
  //   });
  // }
  // showData();
  return (
    <div>
      <div className="text-2xl md:text-4xl font-bold text-start m-4">
        Products
      </div>
      <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-4 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
        {posts.map((post, i) => (
          <div key={i} className="rounded-md border bg-slate-800 p-2">
            <img
              src={post.image}
              alt="Laptop"
              className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
            />
            <div className="p-4">
              <h1 className=" items-center text-start text-xl font-semibold text-white">
                Rs {post.price}
              </h1>
              <p className="mt-2 text-sm text-gray-400">{post.dec}</p>

              <button
                type="button"
                className="mt-4 w-full rounded-sm bg-indigo-500 px-2 py-1.5 text-md font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add to Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
