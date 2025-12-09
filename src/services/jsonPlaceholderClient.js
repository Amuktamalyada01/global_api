const axios = require("axios");
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000
});

let postsCache = null;

async function getAllPosts(params = {}) {
  if (!postsCache) {
    const response = await api.get("/posts");
    postsCache = response.data;
  }

  let result = postsCache;
  if (params.userId) {
    result = result.filter(p => String(p.userId) === String(params.userId));
  }

  return result;
}

async function getPostById(id) {
  const response = await api.get(`/posts/${id}`);
  return response.data;
}

module.exports = { getAllPosts, getPostById };
