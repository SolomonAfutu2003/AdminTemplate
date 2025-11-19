import axiosClient from "./axiosClient";

const blogApi = {
  getAll: () => axiosClient.get("/blogs"),
  getById: (id) => axiosClient.get(`/blogs/${id}`),
  create: (data) =>
    axiosClient.post("/blogs", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  update: (id, data) =>
    axiosClient.put(`/blogs/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => axiosClient.patch(`/blogs/${id}/hide`),
  hide: (id) => axiosClient.patch(`/blogs/${id}/visibility`)
};

export default blogApi;