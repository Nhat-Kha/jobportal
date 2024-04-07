import React from "react";
import { Link } from "react-router-dom";
import News from "../body-news/News";
import tags from "data/conversations-data";

export default function BlogHome() {
  return (
    <>
      <main className="bg-gradient-to-r from-cyan-50 to-[#f8e5d4] ">
        <div className="w-11/12 mx-auto">
          <div className="lg:text-left text-center lg:w-full w-full lg:pt-24 pt-12 lg:pb-40 pb-16">
            <div className="">
              <h1 className="text-[#F2994A] lg:text-6xl text-4xl sm:mt-5 font-bold sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
                JobPortal
              </h1>
              <span className="lg:text-6xl text-4xl sm:mt-5 font-bold sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0 text-slate-500">
                - The idea of developing your IT career
              </span>
            </div>
            <div className="mt-4 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-3">
              <input
                placeholder="Search keyword"
                className="w-2/4 p-4 rounded-lg"
              />
              <Link className="transform ease-in duration-100 md:mx-0 text-black  font-semibold rounded-xl items-center justify-center py-3 border-2  hover:bg-black hover:text-primary  text-base  bg-primary md:py-4 md:text-lg px-8">
                Search
              </Link>
            </div>
            <div className="w-2/4 p-4 mt-4 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-3 bg-amber-50 rounded-lg shadow-2xl">
              <span className="font-semibold">Key Word:</span>
              {tags.map((data, index) => (
                <div key={index} className="flex gap-2">
                  {data.tag.map((tag, tagIndex) => (
                    <div
                      key={tagIndex}
                      className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-gray-900/10 py-1.5 px-3 font-sans text-xs font-bold uppercase text-gray-900
                      hover:bg-gray-900 hover:text-white transition duration-300 hover:border-none"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <News />
    </>
  );
}
