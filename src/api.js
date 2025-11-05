// src/api.js
import axios from "axios";
import { BASE_URL } from "./constant";

export const getVisibleBlogs = async () => axios.get(`${BASE_URL}/blogs`);
export const getVisibleProducts = async () => axios.get(`${BASE_URL}/products`);
export const getVisiblePages = async () => axios.get(`${BASE_URL}/pages`);
export const getBlogById = async (id) => axios.get(`${BASE_URL}/blogs/${id}`);
export const hideBlogById = async (id, token) =>
  axios.patch(
    `${BASE_URL}/blogs/${id}/hide`,
    {}, // no body needed for a PATCH here
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const updateBlogById = async (id, updatedData, token) =>
  axios.put(
    `${BASE_URL}/blogs/${id}`,
    updatedData, // 👈 send the updated blog fields here
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

export const getProductById = async (id) =>
  axios.get(`${BASE_URL}/products/${id}`);
export const getPageById = async (id) => axios.get(`${BASE_URL}/pages/${id}`);
