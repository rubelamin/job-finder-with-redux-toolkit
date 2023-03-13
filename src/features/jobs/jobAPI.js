import axios from "../../utils/axios";

export const createJob = async (data) => {
  const response = await axios.post("/jobs", data);

  return response.data;
};

export const readJobs = async () => {
  const response = await axios.get("/jobs");

  return response.data;
};

export const updateJob = async (id, data) => {
  const response = await axios.put(`/jobs/${id}`, data);

  return response.data;
};

export const deleteJob = async (id) => {
  const response = await axios.delete(`/jobs/${id}`);

  return response.data;
};
