import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

function PublicArticleCard({ article, user }) {
  const { title, imageURL, publisher, description, premium, _id } = article;

  return (
    <div>
      {premium === "yes" ? (
        <>
          <div className="card w-80 bg-yellow-100 shadow-xl">
            <figure>
              <img
                className="aspect-[3/2] grayscale transition-all delay-75 hover:cursor-auto duration-150 hover:grayscale-0"
                src={imageURL}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{title}</h2>
              <p>{description.slice(0, 60)}...</p>
              <p>{publisher}</p>
              <div className="card-actions justify-end">
                <Link
                  to={`/article/${_id}`}
                  disabled={!user?.premiumTaken}
                  className="btn btn-primary"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="card w-80 bg-base-100 shadow-xl">
            <figure>
              <img
                className="aspect-[3/2] grayscale transition-all delay-75 hover:cursor-auto duration-150 hover:grayscale-0"
                src={imageURL}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{title}</h2>
              <p>{description.slice(0, 60)}...</p>
              <p>{publisher}</p>
              <div className="card-actions justify-end">
                <Link
                  to={`/article/${_id}`}
                  onClick={() => handleViewCount(_id)}
                  className="btn btn-primary"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PublicArticleCard;
