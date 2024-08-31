import express from "express";
import { handleGithubHook } from "../controller/index.js";
const rootRouter = express.Router();

rootRouter.post("/github/hook", handleGithubHook);

export { rootRouter };
