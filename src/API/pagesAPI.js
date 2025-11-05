import axiosClient from "./axiosClient";

const pagesApi = {
  getAll: () => axiosClient.get("/pages"),
  getById: (id) => axiosClient.get(`/pages/${id}`),
  create: (data) => axiosClient.post("/pages", data),
  update: (id, data) => axiosClient.put(`/pages/${id}`, data),
  delete: (id) => axiosClient.delete(`/pages/${id}`),
};

export default pagesApi;