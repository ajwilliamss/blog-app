const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const multer = require("multer");
const { errorHandler } = require("./middleware/errorMiddleware");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// Create express application
const app = express();

// Connect to database
connectDB();

// Express middleware
app.use(express.json());
app.use(cors());

// Multer middleware: https://github.com/expressjs/multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json({ message: "Image uploaded" });
});

// Serve images
app.use("/images", express.static(path.join(__dirname, "/images")));

// Serve client
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

// Invoke error handler middleware
app.use(errorHandler);

// Start server on specific port
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
