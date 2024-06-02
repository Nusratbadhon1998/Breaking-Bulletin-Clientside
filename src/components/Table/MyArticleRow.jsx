import React from "react";
import { Link } from "react-router-dom";

function MyArticleRow({ article, idx,handleModal }) {
  const { status, title, premium, _id } = article;

 


  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{title}</td>
      <td>
        <Link to={`/article/${_id}`}>Details</Link>
      </td>
      {status === "Declined" ? <td>{status}|| <button onClick={()=>handleModal(_id)}>reason</button></td> : <td>{status}</td>}
      <td>{premium}</td>
      {/* <td>
      <span
        className={`${
          status === "Pending" ? "text-yellow-500 bg-yellow-200 p-2" : ""
        } ${status === "Approved" ? "text-lime-500 bg-lime-200 p-2" : ""} ${
          status === "Declined" ? "text-red-500 bg-stone-200 p-2" : ""
        }`}
      >
        {status}
      </span>
    </td> */}
      <th>
        <button className="btn btn-ghost btn-xs">Update</button>
      </th>

      <th>
        <button className="btn btn-ghost btn-xs">Delete</button>
      </th>
    </tr>
  );
}

export default MyArticleRow;
