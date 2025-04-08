import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-xl z-50 relative">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl sm:text-3xl md:text-4xl">
          ForTune
        </Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/" className="text-lg">
                Home
              </Link>
            </li>
            <li>
              <Link to="view-all-cards" className="text-lg">
                Explore Deck
              </Link>
            </li>
            <li>
              <Link to="view-prev-read" className="text-lg">
                Your Readings
              </Link>
            </li>
            <li>
              <Link to="about" className="text-lg">
                About
              </Link>
            </li>
          </ul>
        </div>
        <ul className="menu menu-horizontal px-1 hidden lg:flex">
          <li>
            <Link to="/" className="text-lg md:text-xl">
              Home
            </Link>
          </li>
          <li>
            <Link to="view-all-cards" className="text-lg md:text-xl">
              Explore Deck
            </Link>
          </li>
          <li>
            <Link to="view-prev-read" className="text-lg md:text-xl">
              Your Readings
            </Link>
          </li>
          <li>
            <Link to="about" className="text-lg md:text-xl">
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}