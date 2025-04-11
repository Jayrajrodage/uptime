import express from "express";

import {
  createPage,
  deletePage,
  getPageDetails,
  getPages,
  updatePage,
} from "../controller/statusPages";

const router = express.Router();

router.post("/", createPage);

// router.get("/", getPages);

// router.get("/:id", getPageDetails);

// router.put("/:id", updatePage);

// router.delete("/:id", deletePage);

export default router;
