import React from "react";
import news from "data/authors-table-data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function News() {
  console.log("data: ", news);
  return (
    <>
      <h1 className="pt-4 px-20 w-full text-2xl font-semibold">News</h1>
      <div className="px-20 pt-10 pb-2">
        <div className="flex items-center gap-6 w-auto h-90">
          {news.map((data) => (
            <div
              className="transform ease-in duration-100 
            hover:shadow-lg w-full h-full
            bg-slate-50 rounded-2xl text-left cursor-default
            border"
              key={data.id}
            >
              <Link to={`/blog/news/${data.id}`}>
                <img
                  src={data.img}
                  alt=""
                  className="h-40 w-full object-cover rounded-t-2xl hover:opacity-70"
                />
              </Link>
              <h3 className="w-full h-20 p-4 font-semibold">
                <Link
                  className="hover:text-red-400 cursor-pointer"
                  to={`/blog/news/${data.id}`}
                >
                  {data.title}
                </Link>
              </h3>
              <p className="p-4">{data.description.slice(0, 80) + "..."}</p>
              <div className="flex flex-wrap mt-3 gap-2 py-4 px-4">
                <>
                  {data.tags
                    ? data.tags.map((skill, index) => (
                        <div
                          key={index}
                          className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-gray-900/10 py-1.5 px-3 font-sans text-xs font-bold uppercase text-gray-900
                        hover:bg-gray-900 hover:text-white transition duration-300 hover:border-none"
                        >
                          <span>{skill}</span>
                        </div>
                      ))
                    : null}
                </>
              </div>
              <div className="hover:text-blue-500 flex justify-end m-4 cursor-pointer transition duration-300 font-medium">
                <Link to={`/blog/news/${data.id}`}>
                  <a>Start reading</a>
                  <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <span className="pb-10 px-20 w-full text-lg font-medium flex justify-end">
        <Link
          className="border-b-2 border-b-yellow-200 hover:text-yellow-600 hover:border-b-yellow-400 cursor-pointer transition duration-100 text-yellow-400"
          to="/blog/news"
        >
          view all
        </Link>
      </span>
    </>
  );
}
