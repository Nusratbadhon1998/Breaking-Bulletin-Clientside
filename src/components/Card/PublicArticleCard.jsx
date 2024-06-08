import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { LuCrown } from "react-icons/lu";

function PublicArticleCard({ article, user }) {
  const { title, imageURL, publisher, tag, description, premium, _id } =
    article;

  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl ">
        <figure>
          <img
            className="relative aspect-[3/2] grayscale transition-all delay-75 hover:cursor-auto duration-150 hover:grayscale-0"
            src={imageURL}
            alt="Shoes"
          />
          {premium === "yes" ? (
            <p className="absolute right-0 top-0 px-4 py-2 bg-yellow-100 p-2 text-yellow-600 ">
              <LuCrown />
            </p>
          ) : (
            ""
          )}{" "}
        </figure>
        <div className="card-body space-y-4">
          <h2 className="card-title">{title}</h2>

          <p>{description.slice(0, 60)}...</p>
         <div className="flex gap-3 items-center text-yellow-500 font-semibold underline">
         <p>{publisher}</p>
         <p>{tag}</p>
         </div>
          <div className="card-actions justify-center">
            <Link
              to={`/article/${_id}`}
              className="bg-stone-800 px-4 py-2 text-stone-200"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PublicArticleCard;
