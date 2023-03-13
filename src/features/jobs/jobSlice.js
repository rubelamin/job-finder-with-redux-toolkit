import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createJob,
  deleteJob,
  readJobs,
  updateJob,
  readSingleJob,
} from "./jobAPI";

const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  jobs: [],
  editing: {},
};

export const addJob = createAsyncThunk("jobs/addJob", async (data) => {
  const job = await createJob(data);

  return job;
});

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const jobs = await readJobs();

  return jobs;
});

export const fetchSingleJob = createAsyncThunk(
  "jobs/getSingleJob",
  async (id) => {
    const job = await readSingleJob(id);

    return job;
  }
);

export const editJob = createAsyncThunk(
  "jobs/editJobs",
  async ({ id, data }) => {
    const job = await updateJob(id, data);

    return job;
  }
);

export const removeJob = createAsyncThunk("jobs/removeJob", async (id) => {
  const job = await deleteJob(id);

  return job;
});

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.jobs = action.payload;
      })
      .addCase(addJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = action.error?.message;
        state.jobs = [];
        state.editing = {};
      })
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = action.error?.message;
        state.jobs = [];
        state.editing = {};
      })
      .addCase(fetchSingleJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(fetchSingleJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.editing = action.payload;
      })
      .addCase(fetchSingleJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = action.error?.message;
        state.jobs = [];
        state.editing = {};
      })
      .addCase(removeJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(removeJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.jobs = state.jobs.filter((job) => job.id !== action.meta.arg);
      })
      .addCase(removeJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = action.error?.message;
        state.jobs = [];
        state.editing = {};
      });
  },
});

export default jobSlice.reducer;
