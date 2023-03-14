import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editJob, fetchSingleJob } from "../features/jobs/jobSlice";
import moment from "moment";

export default function EditJob() {
  const params = useParams();
  const { jobId } = params;
  const navigate = useNavigate();
  const { editing, isLoading, isError } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  const [jobs, setJobs] = useState([]);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [salary, setSalary] = useState("");
  const [deadline, setDeadLine] = useState("");

  useEffect(() => {
    dispatch(fetchSingleJob(jobId));
  }, [dispatch, jobId]);

  useEffect(() => {
    setJobs([editing]);
  }, [editing]);

  useEffect(() => {
    if (jobs?.length > 0) {
      const job = jobs.find((job) => job.id === Number(jobId));
      setTitle(job?.title);
      setType(job?.type);
      setSalary(job?.salary);
      // console.log(moment(job?.deadline).format("YYYY-MM-DD"));
      if (moment(job?.deadline).format("YYYY-MM-DD") === "Invalid date") {
        let d = new Date();
        d.setDate(d.getDate() + 10);
        setDeadLine(moment(d).format("YYYY-MM-DD"));
      } else {
        setDeadLine(moment(job?.deadline).format("YYYY-MM-DD"));
      }
    }
  }, [jobs, jobId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Number(jobId);
    const data = {
      title,
      type,
      salary,
      deadline,
    };

    dispatch(
      editJob({
        id,
        data,
      })
    );

    // console.log(title, type, salary, deadline);
    formReset();
  };

  const formReset = () => {
    if (!isLoading && !isError) {
      setTitle("");
      setType("");
      setSalary("");
      setDeadLine("");

      navigate("/");
    }
  };

  return (
    <div className="lg:pl-[14rem] mt-[5.8125rem]">
      <main className="max-w-3xl rounded-lg mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
        <h1 className="mb-10 text-center lws-section-title">Edit Job</h1>

        <div className="max-w-3xl mx-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="fieldContainer">
              <label
                htmlFor="lws-JobTitle"
                className="text-sm font-medium text-slate-300"
              >
                Job Title
              </label>
              <select
                id="lws-JobTitle"
                name="lwsJobTitle"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              >
                <option value="" hidden>
                  Select Job
                </option>
                <option>Software Engineer</option>
                <option>Software Developer</option>
                <option>Full Stack Developer</option>
                <option>MERN Stack Developer</option>
                <option>DevOps Engineer</option>
                <option>QA Engineer</option>
                <option>Product Manager</option>
                <option>Social Media Manager</option>
                <option>Senior Executive</option>
                <option>Junior Executive</option>
                <option>Android App Developer</option>
                <option>IOS App Developer</option>
                <option>Frontend Developer</option>
                <option>Frontend Engineer</option>
              </select>
            </div>

            <div className="fieldContainer">
              <label htmlFor="lws-JobType">Job Type</label>
              <select
                id="lws-JobType"
                name="lwsJobType"
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="" hidden>
                  Select Job Type
                </option>
                <option>Full Time</option>
                <option>Internship</option>
                <option>Remote</option>
              </select>
            </div>

            <div className="fieldContainer">
              <label htmlFor="lws-JobSalary">Salary</label>
              <div className="flex border rounded-md shadow-sm border-slate-600">
                <span className="input-tag">BDT</span>
                <input
                  type="number"
                  name="lwsJobSalary"
                  id="lws-JobSalary"
                  required
                  className="!rounded-l-none !border-0"
                  placeholder="20,00,000"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
            </div>

            <div className="fieldContainer">
              <label htmlFor="lws-JobDeadline">Deadline</label>
              <input
                type="date"
                name="lwsJobDeadline"
                id="lws-JobDeadline"
                required
                value={deadline}
                onChange={(e) => setDeadLine(e.target.value)}
              />
            </div>

            <div className="text-right">
              <button
                disabled={isLoading}
                type="submit"
                id="lws-submit"
                className="cursor-pointer btn btn-primary w-fit"
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
