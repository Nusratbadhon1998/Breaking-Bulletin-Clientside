import React from "react";
import { Link, NavLink } from "react-router-dom";

import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaCircle, FaUser } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";
import ResponsiveNav from "./ResponsiveNav";
import { CiLogout } from "react-icons/ci";

function Nav() {
  const { user, logOut } = useAuth();
  // const [isAdmin,isLoading]= useAdmin()
  const [loggedUser, isLoading] = useUser();

  const navItem = (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive ? "underline" : ""
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "underline" : ""
        }
        to="/all-articles"
      >
        All Articles
      </NavLink>
   
     
      {user && <>
        <NavLink
        className={({ isActive }) =>
          isActive ? "underline" : ""
        }
        to="/add-article"
      >
        Add Articles
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "underline" : ""
        }
        to="/subscription"
      >
        Subscription
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "underline" : ""
        }
        to="/my-articles"
      >
        My Articles
      </NavLink></>}
      {user && loggedUser.premiumTaken !== null ? (
        <NavLink to="/premium-articles">Premium Articles</NavLink>
      ) : (
        ""
      )}
      {user && loggedUser.role === "admin" ? (
        <NavLink
          className={({ isActive }) =>
            isActive ? "underline" : ""
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
      <div className="hidden md:block lg:block pt-5">
        <div>
          <h1 className="text-5xl jacquard-24-charted-regular text-center ">
            Breaking Bulletin
          </h1>
        </div>
        <div className="flex justify-between px-10">
          <div className="flex items-center gap-5 *:size-8">
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
                <button
                  className="font-semibold italic flex items-center gap-2 border px-4 py-2 border-black transition-colors duration-150 ease-linear hover:bg-stone-800 hover:text-stone-200"
                  onClick={() => logOut()}
                >
                  <CiLogout />
                  Logout
                </button>
              </>
            ) : (
              <>
                {" "}
                <div className="flex items-center gap-2">
                  <FaUser size={9} />
                  <Link className="font-semibold italic underline" to="/login">
                    Login
                  </Link>
                </div>
                <p className="font-bold">/</p>
                <div className="flex items-center gap-2">
                  <FaUser size={9} />
                  <Link
                    className="font-semibold italic underline"
                    to="/register"
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="divider divider-neutral"></div>
        <div className="flex bg-stone-800 p-3 text-stone-200">
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
