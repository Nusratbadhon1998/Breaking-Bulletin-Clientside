import React from "react";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { SlDislike, SlLike } from "react-icons/sl";
import { FaRegNewspaper } from "react-icons/fa";


function ArticleCard({ article, handleUpdate, handleDelete, handleModal }) {
  const {
    authorImage,
    authorName,
    authorEmail,
    postedDate,
    publisher,
    status,
    title,
    premium,
    _id,
  } = article;
  return (
    <div className="max-w-md px-8 py-4 bg-white border dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <span className="text-sm font-light text-gray-600 dark:text-gray-400">
          {new Date(postedDate).toLocaleDateString()}
        </span>
        <a
          className={`px-3 py-1 text-sm font-bold ${status==='Pending' && "text-yellow-500"} ${status==="Approved"? "text-green-500" :"text-red-600"} transition-colors duration-300 transform rounded cursor-pointer`}
         
        >
          {status}
        </a>
      </div>
      <div className="mt-2">
        <a
          href="#"
          className="text-base font-bold text-stone-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
          tabIndex={0}
          role="link"
        >
          {title}
        </a>
        <p className="mt-2 flex gap-2 items-center text-gray-600  font-light text-xs dark:text-gray-300">
          <FaRegNewspaper/> {publisher}
        </p>
      </div>
      <div className="mt-4 flex items-center gap-2">
       
        <div>
        <img
            className="hidden object-cover w-10 h-10  rounded-full sm:block"
            src={authorImage}
            alt="avatar"
          />
        </div>
          <div className="flex flex-col">
          <p>{authorName}</p>
          <p className="font-light text-xs">{authorEmail}</p>
          </div>
      </div>
      <div className=" mt-4">
        <div className="flex items-center gap-2 *:border *:rounded-full *:p-2">
          <button onClick={() => handleUpdate({ id: _id, status: "Approved" })}>
            <SlLike />
          </button>
          <button
            onClick={() => {
              handleUpdate({ id: _id, status: "Declined" });
              handleModal(_id);
            }}
          >
            <SlDislike />
          </button>
          <button onClick={()=>handleDelete(_id)}>
            <MdDeleteOutline />
          </button>
          {premium === "yes" ? (
            <button className="bg-stone-800 text-stone-200">
              <MdOutlineWorkspacePremium />
            </button>
          ) : (
            <button
              onClick={() => handleUpdate({ id: _id, isPremium: "yes" })}
              className="text-xs"
            >
              Make premium
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
