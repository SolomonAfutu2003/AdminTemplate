import axiosClient from "./axiosClient";

const tabApi = {
  getAll: () => axiosClient.get("/tabs"),
  getById: (id) => axiosClient.get(`/tabs/${id}`),
  create: (data) => axiosClient.post("/tabs", data),
  update: (id, data) => axiosClient.put(`/tabs/${id}`, data),
  delete: (id) => axiosClient.patch(`/tabs/${id}/hide`),
  hide: (id) => axiosClient.patch(`/tabs/${id}/visibility`),
};

export default tabApi;
