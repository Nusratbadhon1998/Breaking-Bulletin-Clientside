import { FaUserSecret } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";

function AllUsersTable({ user,handleAdmin }) {
  console.log(user);
  const { name, photo, email } = user;

  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={photo} />
            </div>
          </div>
        </div>
      </td>
      <td>{name}</td>
      <td>{email}</td>

      <th>
        {user.role === "admin" ? (
         <p className="flex items-center gap-2"> <FaUserSecret/> Admin</p>
        ) : (
          <button onClick={()=>handleAdmin(email)}><FaUserEdit className="size-5"/></button>
        )}
      </th>
    </tr>
  );
}

export default AllUsersTable;
