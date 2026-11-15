
import express from "express";

import {
    getCompletedReport,
    getPendingReport,
    getSummaryReport
} from "../controllers/reportsController.js";

const router = express.Router();

router.get("/completed", getCompletedReport);
router.get("/pending", getPendingReport);
router.get("/summary", getSummaryReport);

export default router;
