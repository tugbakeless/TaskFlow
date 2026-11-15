import taskRoutes from "./routes/taskRoutes.js";
import logger from "./middleware/logger.js";
import reportsRoutes from "./routes/reportsRoutes.js";
import express from "express";

const app = express();
const PORT = 3000;

// JSON verilerini okuyabilmek için
app.use(express.json());
app.use(logger);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportsRoutes);
// Ana sayfa endpoint'i
app.get("/", (req, res) => {
    res.status(200).json({
        message: "TaskFlow API'ye hoş geldiniz!",
        status: "success"
    });
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`TaskFlow API http://localhost:${PORT} adresinde çalışıyor.`);
});
