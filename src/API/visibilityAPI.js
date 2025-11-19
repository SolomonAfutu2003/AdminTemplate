import axiosClient from "./axiosClient";

const visibilityApi = {
  getAll: () => axiosClient.get("/feature"),
  create: (data) => axiosClient.post("/feature", data),
  hide: (id) => axiosClient.patch(`/feature/${id}/visibility`),
};

export default visibilityApi;
