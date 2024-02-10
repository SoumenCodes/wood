import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "./api/config";

function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [filterPost, setFilterPost] = useState([]);

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

  function SearchPost() {
    setSearchActive(true);
    const SearchResult = posts.filter((post) =>
      post.dec
        .toString()
        .toLowerCase()
        .includes(search.toString().toLocaleLowerCase())
    );
    // console.log(FilterPost.map((i) => console.log(i.id)));
    setFilterPost(SearchResult);
  }
  return (
    <div>
      <div className="flex justify-between mt-7 m-2 text-2xl md:text-4xl font-bold text-start ">
        <div>Products</div>
        <div className="flex w- items-center space-x-2 md:w-1/3">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="flex h-10  w-20 md:w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="email"
            placeholder="Search"
          ></input>
          <button
            type="button"
            onClick={() => {
              SearchPost();
            }}
            className="hover:bg-indigo-500 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Search
          </button>
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-4 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
        {(searchActive ? filterPost : posts).map((post, i) => (
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
