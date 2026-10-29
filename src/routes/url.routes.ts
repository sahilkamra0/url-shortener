
import { Router } from "express";
import {
  shortenUrl,
  getAnalytics,
  deleteShortUrl,
  redirectShortUrl,
} from "../controllers/url.controller";

const router = Router();

router.post("/api/shorten", shortenUrl);
router.get("/api/analytics/:shortCode", getAnalytics);
router.delete("/api/shorten/:shortCode", deleteShortUrl);
router.get("/:shortCode", redirectShortUrl);

export default router;
