import express from "express";
import { rootRouter } from "./routes/index.js";
const app = express();

app.use(express.json());

app.use("/", rootRouter);

app.use((err, _, res) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal server error.",
    success: false,
  });
});

app.use("*", (_, res) => {
  res.status(404).json({
    message: "Route not found.",
    success: false,
  });
});

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});
