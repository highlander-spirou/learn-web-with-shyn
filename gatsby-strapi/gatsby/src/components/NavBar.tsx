import React from "react";
import { HeartIcon, CartIcon } from "./SVGs";
import { useShoppingCart } from "../context/ShoppingCartContext";

const NavBar = () => {
  const { cartQuantity } = useShoppingCart();
  return (
    <div className="navbar sticky top-0 z-50 bg-base-100">
      <div className="flex-1 m-2">
        <input
          type="text"
          placeholder="Search for item"
          className="input input-bordered w-full max-w-xs hidden md:block"
        />
      </div>
      <div className="right-drawer btn-group">
        {/* favourite icon */}
        <div className="dropdown dropdown-bottom dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle m-1">
            <div className="indicator">
              <HeartIcon />
              <span className="badge badge-sm indicator-item bg-sky-500 border-0">
                8
              </span>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
        {/* cart icon */}
        <label
          tabIndex={0}
          className="btn btn-ghost btn-circle drawer-button"
          htmlFor="my-drawer-4"
        >
          <div className="indicator">
            <CartIcon />
            {cartQuantity > 0 && (
              <span className="badge badge-sm indicator-item bg-sky-500 border-0">
                {cartQuantity}
              </span>
            )}
          </div>
        </label>
        <div className="dropdown dropdown-end border-l-2 pl-5 mx-4">
          <label
            tabIndex={0}
            className="font-bold text-lg text-sky-600 cursor-pointer"
          >
            Shyn Lê
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
