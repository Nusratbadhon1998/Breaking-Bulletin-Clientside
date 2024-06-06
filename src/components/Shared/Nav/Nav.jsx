import React from "react";
import { Link, NavLink } from "react-router-dom";

import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";
import ResponsiveNav from "./ResponsiveNav";

function Nav() {
  const { user, logOut } = useAuth();
  // const [isAdmin,isLoading]= useAdmin()
  const [loggedUser, isLoading] = useUser();

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
        to="/add-article"
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
      {user && loggedUser.premiumTaken !== null ? (
        <NavLink to="/premium-articles">Premium Articles</NavLink>
      ) : (
        ""
      )}
      {user && loggedUser.role === "admin" ? (
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-yellow-500" : "text-stone-700"
          }
          to="/dashboard"
        >
          Dashboard
        </NavLink>
      ) : (
        ""
      )}
    </>
  );

  return (
    <nav>
      <div className="hidden md:block lg:block">
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
                  <div className="avatar online">
                    <div className="w-12 h-12 rounded-full">
                      <img
                        className="w-full h-full"
                        src={
                          user?.photoURL ||
                          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                        }
                      />
                    </div>
                  </div>
                </Link>
                <button onClick={() => logOut()}>Logout</button>
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
        <div className="flex">
          <ul className="menu menu-horizontal px-1 text-center mx-auto space-x-5 font-bold">
            {navItem}
          </ul>
        </div>
      </div>

      <ResponsiveNav navItem={navItem} />
    </nav>
  );
}

export default Nav;
