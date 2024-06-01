import React from "react";

function ArticleTableRow({ article, handleStatus }) {
  const {
    authorImage,
    authorName,
    authorEmail,
    postedDate,
    publisher,
    status,
    title,
    _id,
  } = article;

  console.log(_id);
  const date = new Date(postedDate).toLocaleDateString("en-US");

  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={authorImage} />
            </div>
          </div>
        </div>
      </td>
      <td>{authorName}</td>
      <td>{authorEmail}</td>
      <td>{title}</td>
      <td>{date}</td>
      <th>
        <button className="btn btn-ghost btn-xs">Approved</button>
      </th>
     
    </tr>
  );
}

export default ArticleTableRow;
