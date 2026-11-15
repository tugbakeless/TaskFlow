import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const dataPath = path.join(
    process.cwd(),
    "src",
    "data",
    "tasks.json"
);

// Bütün görevleri listele


export const getAllTasks = async (req, res) => {
    try {
        const {
            status,
            priority,
            page = "1",
            limit = "10",
            sort = "createdAt",
            order = "desc"
        } = req.query;

        // Sayfalama parametrelerini kontrol et
        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        if (
            !Number.isInteger(pageNumber) ||
            !Number.isInteger(limitNumber) ||
            pageNumber < 1 ||
            limitNumber < 1 ||
            limitNumber > 100
        ) {
            return res.status(400).json({
                success: false,
                message: "Page en az 1, limit 1-100 arasında bir tam sayı olmalıdır."
            });
        }

        // Sıralama alanlarını kontrol et
        const allowedSortFields = [
            "createdAt",
            "title",
            "priority"
        ];

        if (
            !allowedSortFields.includes(sort) ||
            !["asc", "desc"].includes(order)
        ) {
            return res.status(400).json({
                success: false,
                message: "Geçersiz sıralama parametresi."
            });
        }

        const data = await fs.readFile(dataPath, "utf-8");
        let tasks = JSON.parse(data);

        // Duruma göre filtreleme
        if (status) {
            tasks = tasks.filter(
                task => task.status === status
            );
        }

        // Önceliğe göre filtreleme
        if (priority) {
            tasks = tasks.filter(
                task => task.priority === priority
            );
        }

        // Filtreleme sonrası toplam görev sayısı
        const totalTasks = tasks.length;


        // Sıralama
        tasks.sort((a, b) => {
            let comparison = 0;

            if (sort === "createdAt") {
                const dateA = new Date(a.createdAt || 0).getTime();
                const dateB = new Date(b.createdAt || 0).getTime();

                comparison = dateA - dateB;

            } else if (sort === "title") {
                comparison = String(a.title || "").localeCompare(
                    String(b.title || ""),
                    "tr"
                );

            } else if (sort === "priority") {
                const priorityOrder = {
                    low: 1,
                    medium: 2,
                    high: 3
                };

                comparison =
                    (priorityOrder[a.priority] || 0) -
                    (priorityOrder[b.priority] || 0);
            }

            return order === "asc" ? comparison : -comparison;
        });


        // Sayfalama
        const startIndex = (pageNumber - 1) * limitNumber;
        const paginatedTasks = tasks.slice(
            startIndex,
            startIndex + limitNumber
        );

        return res.status(200).json({
            success: true,
            pagination: {
                currentPage: pageNumber,
                limit: limitNumber,
                totalTasks,
                totalPages: Math.ceil(totalTasks / limitNumber)
            },
            count: paginatedTasks.length,
            data: paginatedTasks
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Görevler alınırken hata oluştu."
        });
    }
};



// Yeni görev oluştur
export const createTask = async (req, res) => {
    try {
        const { title, description, priority, assignee } = req.body;

        // Başlık kontrolü
        if (!title || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Görev başlığı zorunludur."
            });
        }

        // Mevcut görevleri oku
        const data = await fs.readFile(dataPath, "utf-8");
        const tasks = JSON.parse(data);

        // Yeni görev nesnesi
        const newTask = {
            id: randomUUID(),
            title: title.trim(),
            description: description || "",
            priority: priority || "medium",
            assignee: assignee || "",
            status: "pending",
            createdAt: new Date().toISOString()
        };

        // Yeni görevi listeye ekle
        tasks.push(newTask);

        // JSON dosyasına kaydet
        await fs.writeFile(
            dataPath,
            JSON.stringify(tasks, null, 4)
        );

        return res.status(201).json({
            success: true,
            message: "Görev başarıyla oluşturuldu.",
            data: newTask
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Görev oluşturulurken hata oluştu."
        });
    }
};


export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await fs.readFile(dataPath, "utf-8");
        const tasks = JSON.parse(data);

        const task = tasks.find(item => item.id === id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Görev bulunamadı."
            });
        }

        return res.status(200).json({
            success: true,
            data: task
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Görev detayı alınırken hata oluştu."
        });
    }
};


export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, priority, assignee, status } = req.body;

        const data = await fs.readFile(dataPath, "utf-8");
        const tasks = JSON.parse(data);

        const taskIndex = tasks.findIndex(item => item.id === id);

        // Görev bulunamadıysa
        if (taskIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Güncellenecek görev bulunamadı."
            });
        }

        // Başlık gönderilmiş ama boş bırakılmışsa
        if (title !== undefined && !title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Görev başlığı boş olamaz."
            });
        }

        // Görev bilgilerini güncelle
        tasks[taskIndex] = {
            ...tasks[taskIndex],
            ...(title !== undefined && { title: title.trim() }),
            ...(description !== undefined && { description }),
            ...(priority !== undefined && { priority }),
            ...(assignee !== undefined && { assignee }),
            ...(status !== undefined && { status }),
            updatedAt: new Date().toISOString()
        };

        await fs.writeFile(
            dataPath,
            JSON.stringify(tasks, null, 4)
        );

        return res.status(200).json({
            success: true,
            message: "Görev başarıyla güncellendi.",
            data: tasks[taskIndex]
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Görev güncellenirken hata oluştu."
        });
    }
};


export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        // Görevleri oku
        const data = await fs.readFile(dataPath, "utf-8");
        const tasks = JSON.parse(data);

        // Silinecek görevi bul
        const taskIndex = tasks.findIndex(
            item => item.id === id
        );

        // Görev bulunamadıysa
        if (taskIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Silinecek görev bulunamadı."
            });
        }

        // Silinen görevi sakla
        const deletedTask = tasks[taskIndex];

        // Görevi listeden çıkar
        tasks.splice(taskIndex, 1);

        // JSON dosyasına kaydet
        await fs.writeFile(
            dataPath,
            JSON.stringify(tasks, null, 4)
        );

        return res.status(200).json({
            success: true,
            message: "Görev başarıyla silindi.",
            data: deletedTask
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Görev silinirken hata oluştu."
        });
    }
};


export const searchTasks = async (req, res) => {
    try {
        const { keyword } = req.query;

        if (!keyword || !keyword.trim()) {
            return res.status(400).json({
                success: false,
                message: "Arama kelimesi zorunludur."
            });
        }

        const data = await fs.readFile(dataPath, "utf-8");
        const tasks = JSON.parse(data);

        const searchTerm = keyword.trim().toLowerCase();

        const results = tasks.filter(task =>
            task.title.toLowerCase().includes(searchTerm) ||
            task.description.toLowerCase().includes(searchTerm)
        );

        return res.status(200).json({
            success: true,
            count: results.length,
            data: results
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Görevler aranırken hata oluştu."
        });
    }
};


export const getTasksByAssignee = async (req, res) => {
    try {
        const { assignee } = req.params;

        const data = await fs.readFile(dataPath, "utf-8");
        const tasks = JSON.parse(data);

        const results = tasks.filter(task =>
            task.assignee.toLowerCase() === assignee.toLowerCase()
        );

        return res.status(200).json({
            success: true,
            assignee,
            count: results.length,
            data: results
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Kullanıcı görevleri alınırken hata oluştu."
        });
    }
};




