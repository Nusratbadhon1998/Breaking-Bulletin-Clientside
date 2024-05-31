import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";

function Nav() {
  const { user, logOut } = useAuth();

  const navItem = (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive ? "text-yellow-500" : "text-stone-700"
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "text-yellow-500" : "text-stone-700"
        }
        to="/add-articles"
      >
        Add Articles
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "text-yellow-500" : "text-stone-700"
        }
        to="/all-articles"
      >
        All Articles
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "text-yellow-500" : "text-stone-700"
        }
        to="/subscription"
      >
        Subscription
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "text-yellow-500" : "text-stone-700"
        }
        to="/my-articles"
      >
        My Articles
      </NavLink>
    </>
  );

  return (
    <nav>
      <div>
        <h1 className="text-3xl jacquard-24-charted-regular text-center ">
          Breaking Bulletin
        </h1>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <FaSquareFacebook />
          <FaSquareXTwitter />
        </div>

        <div className="flex items-center gap-5">
          {user ? (
            <>
              <Link to="/my-profile" className="avatar online">
                <div size={5}  className="rounded-full w-12 h-12">
                  <img className="w-full h-full" src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                </div>
              </Link>
              <button onClick={()=>logOut()}>Logout</button>
            </>
          ) : (
            <>
              {" "}
              <div className="flex items-center gap-2">
                <FaCircle size={5} />
                <Link to="/login">Login</Link>
              </div>
              <div className="flex items-center gap-2">
                <FaCircle size={5} />
                <button>Register</button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="divider divider-neutral"></div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-center mx-auto space-x-5 font-bold">
          {navItem}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;

// <div className="navbar bg-base-100">
//   <div className="flex-1">
//     <a className="btn btn-ghost text-xl">daisyUI</a>
//   </div>
//   <div className="flex-none">
//     <div className="dropdown dropdown-end">
//       <Link to="/login">Login</Link>

//       <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
//         <div className="indicator">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//             />
//           </svg>
//           <span className="badge badge-sm indicator-item">8</span>
//         </div>
//       </div>
//       <div
//         tabIndex={0}
//         className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
//       >
//         <div className="card-body">
//           <span className="font-bold text-lg">8 Items</span>
//           <span className="text-info">Subtotal: $999</span>
//           <div className="card-actions">
//             <button className="btn btn-primary btn-block">View cart</button>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="dropdown dropdown-end">
//       <div
//         tabIndex={0}
//         role="button"
//         className="btn btn-ghost btn-circle avatar"
//       >
//         <div className="w-10 rounded-full">
//           <img
//             alt="Tailwind CSS Navbar component"
//             src={
//               user?.photoURL ||
//               "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
//             }
//           />
//         </div>
//       </div>
//       <ul
//         tabIndex={0}
//         className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
//       >
//         <li>
//           <a className="justify-between">
//             Profile
//             <span className="badge">New</span>
//           </a>
//         </li>
//         <li>
//           <a>Settings</a>
//         </li>
//         <li>
//           <a>Logout</a>
//         </li>
//       </ul>
//     </div>
//     <button className="btn btn-secondary" onClick={() => logOut()}>
//       Logout
//     </button>
//   </div>
// </div>
