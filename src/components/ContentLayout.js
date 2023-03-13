import React, { useState } from "react";
import ContentBar from "./ContentBar";
import EditJob from "./EditJob";
import AddNewJob from "./Form/AddNewJob";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function ContentLayout() {
  const [jobType, setJobType] = useState("");

  return (
    <Router>
      <NavBar />
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8 ">
        <SideBar jobTypeF={setJobType} />
        <Routes>
          <Route path="/" element={<ContentBar jobType={jobType} />} />
          <Route path="/AddNewJob" element={<AddNewJob />} />
          <Route path="/EditJob/:jobId" element={<EditJob />} />
        </Routes>
      </div>
    </Router>
  );
}
