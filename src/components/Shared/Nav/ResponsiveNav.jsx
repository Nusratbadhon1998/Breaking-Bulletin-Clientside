import { GiHamburgerMenu } from "react-icons/gi";

function ResponsiveNav({navItem}) {
  return (
    <div className="flex justify-between items-center md:hidden lg:hidden ">
    <div className="navbar-start flex-1">
      <h1>Breaking Bulletin</h1>
    </div>
    <div className="navbar-end ">
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button "
          >
           <GiHamburgerMenu/>
          </label>
        </div>
        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu z-50 p-4 w-60 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {navItem}
          </ul>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ResponsiveNav