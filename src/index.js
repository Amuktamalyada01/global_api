const express = require("express");
const postsRouter = require("./routes/posts");
const app = express();

app.use(express.json());
app.use("/api", postsRouter);
app.get("/", (req, res) => {
  res.send("Global API assignment server is running");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});