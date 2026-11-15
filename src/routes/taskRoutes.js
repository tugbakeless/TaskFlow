import express from "express";
import validateTask from "../middleware/validateTask.js";
import {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    searchTasks,
    getTasksByAssignee
} from "../controllers/taskController.js";
const router = express.Router();

// Bütün görevleri listele
router.get("/", getAllTasks);

router.get("/search", searchTasks);

router.get("/assignee/:assignee", getTasksByAssignee);

// Yeni görev oluştur
router.post("/", validateTask, createTask);

router.get("/:id", getTaskById);

router.put("/:id", validateTask, updateTask);

router.delete("/:id", deleteTask);

export default router;