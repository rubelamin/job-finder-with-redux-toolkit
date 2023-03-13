import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../features/jobs/jobSlice";

import JobList from "./JobList";
import JobsHead from "./JobsHead";
import Loading from "./ui/Loading";

export default function ContentBar({ jobType }) {
  const { jobs, isLoading, isError } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  // decide what to render

  let content = null;
  if (isLoading) content = <Loading />;

  if (!isLoading && isError)
    content = <p className="error">There is an error occured.</p>;

  if (
    !isLoading &&
    !isError &&
    jobs?.length > 0 &&
    !searchText &&
    !sort &&
    !jobType
  ) {
    content = jobs.map((job) => <JobList jobData={job} key={job.id} />);
  }
  if (
    !isLoading &&
    !isError &&
    jobs?.length > 0 &&
    !searchText &&
    !sort &&
    jobType
  ) {
    const sortJobs = [...jobs];
    content = sortJobs
      .filter((job) => job.type === jobType)
      .map((job) => <JobList jobData={job} key={job.id} />);
  }

  if (
    !isLoading &&
    !isError &&
    jobs?.length > 0 &&
    !searchText &&
    sort &&
    !jobType
  ) {
    const sortJobs = [...jobs];
    if (sort === "HighToLow") {
      content = sortJobs
        .sort((a, b) => b.salary - a.salary)
        .map((job) => <JobList jobData={job} key={job.id} />);
    } else if (sort === "LowToHigh") {
      content = sortJobs
        .sort((a, b) => a.salary - b.salary)
        .map((job) => <JobList jobData={job} key={job.id} />);
    }
  }

  if (
    !isLoading &&
    !isError &&
    jobs?.length > 0 &&
    !searchText &&
    sort &&
    jobType
  ) {
    const sortJobs = [...jobs];
    if (sort === "HighToLow") {
      content = sortJobs
        .sort((a, b) => b.salary - a.salary)
        .filter((job) => job.type === jobType)
        .map((job) => <JobList jobData={job} key={job.id} />);
    } else if (sort === "LowToHigh") {
      content = sortJobs
        .sort((a, b) => a.salary - b.salary)
        .filter((job) => job.type === jobType)
        .map((job) => <JobList jobData={job} key={job.id} />);
    }
  }

  if (
    !isLoading &&
    !isError &&
    jobs?.length > 0 &&
    searchText &&
    sort &&
    !jobType
  ) {
    const sortJobs = [...jobs];
    if (sort === "HighToLow") {
      content = sortJobs
        .sort((a, b) => b.salary - a.salary)
        .filter((job) => job.title.toLowerCase().includes(searchText))
        .map((job) => <JobList jobData={job} key={job.id} />);
    } else if (sort === "LowToHigh") {
      content = sortJobs
        .sort((a, b) => a.salary - b.salary)
        .filter((job) => job.title.toLowerCase().includes(searchText))
        .map((job) => <JobList jobData={job} key={job.id} />);
    }
  }

  if (
    !isLoading &&
    !isError &&
    jobs?.length > 0 &&
    searchText &&
    sort &&
    jobType
  ) {
    const sortJobs = [...jobs];
    if (sort === "HighToLow") {
      content = sortJobs
        .sort((a, b) => b.salary - a.salary)
        .filter((job) => job.type === jobType)
        .filter((job) => job.title.toLowerCase().includes(searchText))
        .map((job) => <JobList jobData={job} key={job.id} />);
    } else if (sort === "LowToHigh") {
      content = sortJobs
        .sort((a, b) => a.salary - b.salary)
        .filter((job) => job.type === jobType)
        .filter((job) => job.title.toLowerCase().includes(searchText))
        .map((job) => <JobList jobData={job} key={job.id} />);
    }
  }

  if (
    !isLoading &&
    !isError &&
    jobs?.length > 0 &&
    searchText &&
    !sort &&
    jobType
  ) {
    content = jobs
      .filter((job) => job.title.toLowerCase().includes(searchText))
      .filter((job) => job.type === jobType)
      .map((jobDetails) => (
        <JobList jobData={jobDetails} key={jobDetails.id} />
      ));
  }

  if (
    !isLoading &&
    !isError &&
    jobs?.length > 0 &&
    searchText &&
    !sort &&
    !jobType
  ) {
    content = jobs
      .filter((job) => job.title.toLowerCase().includes(searchText))
      .map((jobDetails) => (
        <JobList jobData={jobDetails} key={jobDetails.id} />
      ));
  }

  return (
    <div className="lg:pl-[14rem]  mt-[5.8125rem]">
      <main className="max-w-3xl rounded-lg  mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
        <JobsHead
          text={setSearchText}
          textValue={searchText}
          sort={sort}
          sortF={setSort}
        />

        <div className="jobs-list">{content}</div>
      </main>
    </div>
  );
}
