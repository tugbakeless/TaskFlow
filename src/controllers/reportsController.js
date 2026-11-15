
import fs from "fs/promises";
import path from "path";

const dataPath = path.join(process.cwd(), "src", "data", "tasks.json");

// JSON dosyasındaki görevleri okur.
const readTasks = async () => {
    const data = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(data);
};

// Tamamlanan görev sayısı
export const getCompletedReport = async (req, res) => {
    try {
        const tasks = await readTasks();

        const completedTasks = tasks.filter(
            task => task.status === "completed"
        );

        return res.status(200).json({
            success: true,
            count: completedTasks.length,
            message: "Tamamlanan görev raporu başarıyla oluşturuldu."
        });
    } catch (error) {
        console.error("Completed report error:", error);

        return res.status(500).json({
            success: false,
            message: "Tamamlanan görev raporu oluşturulurken hata oluştu."
        });
    }
};

// Bekleyen görev sayısı
export const getPendingReport = async (req, res) => {
    try {
        const tasks = await readTasks();

        const pendingTasks = tasks.filter(
            task => task.status === "pending"
        );

        return res.status(200).json({
            success: true,
            count: pendingTasks.length,
            message: "Bekleyen görev raporu başarıyla oluşturuldu."
        });
    } catch (error) {
        console.error("Pending report error:", error);

        return res.status(500).json({
            success: false,
            message: "Bekleyen görev raporu oluşturulurken hata oluştu."
        });
    }
};

// Genel sistem özeti
export const getSummaryReport = async (req, res) => {
    try {
        const tasks = await readTasks();

        const completedTasks = tasks.filter(
            task => task.status === "completed"
        ).length;

        const pendingTasks = tasks.filter(
            task => task.status === "pending"
        ).length;

        const statusDistribution = tasks.reduce((summary, task) => {
            const status = task.status || "undefined";
            summary[status] = (summary[status] || 0) + 1;
            return summary;
        }, {});

        return res.status(200).json({
            success: true,
            summary: {
                totalTasks: tasks.length,
                completedTasks,
                pendingTasks,
                otherTasks: tasks.length - completedTasks - pendingTasks,
                statusDistribution
            },
            message: "Genel sistem özeti başarıyla oluşturuldu."
        });
    } catch (error) {
        console.error("Summary report error:", error);

        return res.status(500).json({
            success: false,
            message: "Genel sistem özeti oluşturulurken hata oluştu."
        });
    }
};
