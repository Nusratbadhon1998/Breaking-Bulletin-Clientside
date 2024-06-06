import React from "react";
import { Link } from "react-router-dom";
import { MdDeleteSweep } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";
import { CiStickyNote } from "react-icons/ci";

function MyArticleRow({ article, idx, handleModal, handleDelete }) {
  const { status, title, premium, _id } = article;

  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{title}</td>
      <td>
        <Link to={`/article/${_id}`}>Details</Link>
      </td>
      {status === "Declined" ? (
        <td className="">
          {status}||
          <button onClick={() => handleModal(_id)}>
            <CiStickyNote className="flex items-center justify-center flex-col" />
          </button>
        </td>
      ) : (
        <td>{status}</td>
      )}
      <td>{premium}</td>

      <th>
        <Link to={`/update/${_id}`}>
          <VscSaveAs className="size-6" />
        </Link>
      </th>

      <th>
        <button onClick={() => handleDelete(_id)}>
          <MdDeleteSweep className="size-6" />
        </button>
      </th>
    </tr>
  );
}

export default MyArticleRow;
