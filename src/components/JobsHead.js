import React from "react";

export default function JobsHead({ text, textValue, sort, sortF }) {
  return (
    <div className="md:flex space-y-2 md:space-y-0 justify-between mb-10 ">
      <h1 className="lws-section-title">All Available Jobs</h1>
      <div className="flex gap-4">
        <div className="search-field group flex-1">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input
            type="text"
            placeholder="Search Job"
            className="search-input"
            id="lws-searchJob"
            value={textValue}
            onChange={(e) => text(e.target.value)}
          />
        </div>
        <select
          id="lws-sort"
          name="sort"
          autoComplete="sort"
          className="flex-1"
          value={sort}
          onChange={(e) => sortF(e.target.value)}
        >
          <option value="">Default</option>
          <option value="LowToHigh">Salary (Low to High)</option>
          <option value="HighToLow">Salary (High to Low)</option>
        </select>
      </div>
    </div>
  );
}
