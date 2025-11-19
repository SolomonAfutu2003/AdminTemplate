import axiosClient from "./axiosClient";

const serviceApi = {
  getAll: () => axiosClient.get("/services"),
  getById: (id) => axiosClient.get(`/services/${id}`),
  create: (data) => axiosClient.post("/services", data),
  update: (id, data) => axiosClient.put(`/services/${id}`, data),
  delete: (id) => axiosClient.patch(`/services/${id}/hide`),
  hide: (id) => axiosClient.patch(`/services/${id}/visibility`),
};

export default serviceApi;
