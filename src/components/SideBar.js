import React from "react";
import { Link } from "react-router-dom";

export default function SideBar({ jobTypeF }) {
  return (
    <div className="sidebar">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className="main-menu menu-active"
              id="lws-alljobs-menu"
              onClick={() => jobTypeF("")}
            >
              <i className="fa-solid fa-briefcase"></i>
              <span> All Available Jobs</span>
            </Link>
            <ul className="space-y-6 lg:space-y-2 ">
              <li>
                <span
                  className="sub-menu"
                  id="lws-internship-menu"
                  onClick={() => jobTypeF("Internship")}
                >
                  <i className="fa-solid fa-stop !text-[#FF5757]"></i>
                  Internship
                </span>
              </li>
              <li>
                <span
                  className="sub-menu"
                  id="lws-fulltime-menu"
                  onClick={() => jobTypeF("Full Time")}
                >
                  <i className="fa-solid fa-stop !text-[#FF8A00]"></i>
                  Full Time
                </span>
              </li>
              <li>
                <span
                  className="sub-menu"
                  id="lws-remote-menu"
                  onClick={() => jobTypeF("Remote")}
                >
                  <i className="fa-solid fa-stop !text-[#56E5C4]"></i>
                  Remote
                </span>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/AddNewJob" className="main-menu" id="lws-addJob-menu">
              <i className="fa-solid fa-file-circle-plus"></i>
              <span>Add NewJob</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
