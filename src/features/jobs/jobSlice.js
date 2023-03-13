import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createJob, deleteJob, readJobs, updateJob } from "./jobAPI";

const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  jobs: [],
};

export const addJob = createAsyncThunk("jobs/addJob", async (data) => {
  const job = await createJob(data);

  return job;
});

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const jobs = await readJobs();

  return jobs;
});

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
      });
  },
});

export default jobSlice.reducer;
