import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/postRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(
  cors(
  {
  origin: "https://post-app-react-black.vercel.app", // Replace with your actual domain
  credentials: true, // Allow cookies to be sent with the requests
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"] // Allowed request headers
}));

app.use("/api/posts", postRoutes);
app.use("/api/posts/vote", voteRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("server is ready"));
}

export default app;
