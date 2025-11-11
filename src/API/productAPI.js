import axiosClient from "./axiosClient";

const productApi = {
  getAll: () => axiosClient.get("/products"),
  getById: (id) => axiosClient.get(`/products/${id}`),
  create: (data) => axiosClient.post("/products", data, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  update: (id, data) => axiosClient.put(`/products/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  delete: (id) => axiosClient.patch(`/products/${id}/hide`),
};

export default productApi;