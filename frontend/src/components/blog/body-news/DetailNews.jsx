import news from "data/authors-table-data";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailNews() {
  const { id } = useParams();
  const [collapseOpen, setCollapseOpen] = useState(false);

  const filteredNews = news.filter((data) => data.id.toString() === id);

  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };

  console.log("news after: ", filteredNews);

  return (
    <>
      {filteredNews.map((data) => (
        <div key={data.id} className="rounded-xl bg-slate-100 pt-1 pb-1">
          <div className="p-6 w-8/12 mx-auto mt-10 mb-4 rounded-md bg-white shadow-sm">
            <img
              alt="logo"
              className="md:h-[31rem] md:w-[60rem] object-cover md:mr-6 mr-4 rounded-md"
              src={data.img}
            />
            <div className="w-full flex items-center justify-between">
              <div className="w-3/4 flex gap-2">
                <div className="flex flex-col">
                  <h1 className="text-2xl font-semibold text-gray-600">
                    {data.title}
                  </h1>
                  <span className="text-base text-gray-400">
                    By : {data.useUpload}
                  </span>
                  <span className="text-base text-gray-400">
                    Published : {data.dateUpload}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap mt-3 gap-2 py-4 px-4 justify-start">
              <>
                <span>Tag: </span>

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
            <div className="w-full flex flex-wrap md:flex-row gap-2 items-start justify-start mt-4">
              <div className="w-2/4 h-auto rounded-lg flex flex-col items-start justify-start">
                <button
                  onClick={toggleCollapse}
                  class="select-none rounded-lg bg-gray-900 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  {collapseOpen ? "Close main content" : "Show main content"}
                </button>
                <div
                  className={`${
                    collapseOpen ? "block" : "hidden"
                  } h-0 w-full basis-full overflow-hidden transition-all duration-300 ease-in-out`}
                >
                  <div className="relative my-2 flex w-6/12 items-start justify-start rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                    <div className="p-6">
                      {filteredNews.map((data) => (
                        <div key={data.id}>
                          {data.about.map((aboutItem) => {
                            const [number, content] = aboutItem.split("- ");
                            const id = number
                              .trim()
                              .toLowerCase()
                              .replace(/\s+/g, "-");

                            return (
                              <a
                                href={`#${id}`}
                                className="block font-sans text-base font-light leading-relaxed text-inherit antialiased hover:underline hover:text-blue-400 transition duration-200"
                                key={aboutItem}
                              >
                                {aboutItem.split("- ")[0]}
                              </a>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-wrap md:flex-row gap-2 items-center justify-between my-10">
              <div className="bg-gray-200 w-full h-auto rounded-lg flex flex-col items-center justify-center text-wrap">
                <span className="text-xl font-bold pt-2">Description</span>
                <p className="text-lg font-semibold text-gray-700 p-4 break-all">
                  {data.description}
                </p>
              </div>
            </div>

            <div className="w-full gap-4 py-5">
              <hr className="my-8 border-gray-300" />
            </div>

            <div>
              <h1 className="text-2xl font-bold">About</h1>
              {data.about.map((aboutItem, index) => {
                const [number, content] = aboutItem.split("- ");
                const id = number.trim().toLowerCase().replace(/\s+/g, "-");
                return (
                  <div key={index}>
                    <span>
                      <strong id={id}>{number} </strong>
                    </span>
                    <br />
                    <div
                      dangerouslySetInnerHTML={{ __html: content }}
                    ></div>{" "}
                    <br /> <br />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
