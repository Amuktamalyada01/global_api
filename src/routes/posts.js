const express = require("express");
const router = express.Router();
const { getAllPosts, getPostById } = require("../services/jsonPlaceholderClient");

router.get("/posts", async (req, res) => {
  try {
    const { userId } = req.query;
    const posts = await getAllPosts({ userId });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error.message);

    if (error.code === "ECONNABORTED") {
      return res.status(504).json({ message: "Upstream API timeout" });
    }
    if (error.response) {
      return res.status(error.response.status).json({ message: "Upstream API error" });
    }
    res.status(503).json({ message: "Network error while calling external API" });
  }
});

router.get("/posts/:id", async (req, res) => {
  const id = req.params.id;

  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ message: "id must be a number" });
  }

  try {
    const post = await getPostById(id);

    if (!post || post.id == null || !post.title || !post.body) {
      return res.status(500).json({ message: "Unexpected data from external API" });
    }

    res.json(post);
  } catch (error) {
    console.error("Error fetching post by id:", error.message);

    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (error.code === "ECONNABORTED") {
      return res.status(504).json({ message: "Upstream API timeout" });
    }
    if (error.response) {
      return res.status(error.response.status).json({ message: "Upstream API error" });
    }
    res.status(503).json({ message: "Network error while calling external API" });
  }
});

module.exports = router;
