/** source/routes/posts.ts */
import express from "express";
import {
  getPosts,
  getTopicOffsets,
  getTopics,
  produceToTopic,
} from "../controller/posts";
const router = express.Router();

router.get("/posts", getPosts);
router.get("/topics", getTopics);
router.post("/topics", produceToTopic);
router.get("/topics/:topic/offsets", getTopicOffsets);
export = router;
