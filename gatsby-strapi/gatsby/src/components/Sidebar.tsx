import React from "react";
import { ExpandBar } from "./SVGs";

const Sidebar = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <label
        htmlFor="my-drawer-2"
        className="btn btn-square btn-ghost lg:hidden"
      >
        <ExpandBar />
      </label>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="page-content">{children}</div>
        </div>
        <div className="sidebar-content drawer-side w-[250px]">
          <label
            htmlFor="my-drawer-2"
            className="drawer-overlay w-[200px]"
          ></label>
          <ul className="w-full menu px-4 py-6 bg-base-100 text-base-content border-r-2">
            <p className="text-4xl font-extrabold flex justify-start px-4 pt-2 pb-14 cursor-default text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-200">
              daisy UI
            </p>
            {/* <!-- Sidebar    content here --> */}
            <li className="py-6 hover:font-bold">
              <a>Sidebar Item 1</a>
            </li>
            <li className="hover:font-bold">
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
