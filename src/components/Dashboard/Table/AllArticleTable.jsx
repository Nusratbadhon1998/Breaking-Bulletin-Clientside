function AllArticleTable({ article, handleUpdate, handleDelete,handleModal }) {
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


  const date = new Date(postedDate).toLocaleDateString("en-US");

  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask w-12 h-12">
              <img src={authorImage} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
        </div>
      </td>
      <td>{authorName}</td>
      <td>{authorEmail}</td>
      <td>{title}</td>
      <td>{date}</td>
      <td>
        <span
          className={`${
            status === "Pending" ? "text-yellow-500 bg-yellow-200 p-2" : ""
          } ${status === "Approved" ? "text-lime-500 bg-lime-200 p-2" : ""} ${
            status === "Declined" ? "text-red-500 bg-stone-200 p-2" : ""
          }`}
        >
          {status}
        </span>
      </td>
      <td>{publisher}</td>
      <th>
        <button
          onClick={() => handleUpdate({ id: _id, status: "Approved" })}
          className="btn btn-ghost btn-xs"
        >
          Approve
        </button>
      </th>
      <th>
        <button
          onClick={() => {
            handleUpdate({ id: _id, status: "Declined" });
            handleModal(_id)
          }}
          className="btn btn-ghost btn-xs"
        >
          Decline
        </button>
      </th>
      <th>
        <button className="btn btn-ghost btn-xs">Delete</button>
      </th>
      <th>
        {premium === "yes" ? (
          "Premium"
        ) : (
          <button
            onClick={() => handleUpdate({ id: _id, isPremium: "yes" })}
            className="btn btn-ghost btn-xs"
          >
            Make Premium
          </button>
        )}
      </th>
    </tr>
  );
}
export default AllArticleTable;
