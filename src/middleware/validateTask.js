
const validateTask = (req, res, next) => {
    const { title, description, priority, assignee } = req.body;

    const errors = [];

    // POST işleminde bütün alanlar zorunlu
    if (req.method === "POST") {
        if (typeof title !== "string" || !title.trim()) {
            errors.push("Görev başlığı zorunludur.");
        }

        if (typeof description !== "string" || !description.trim()) {
            errors.push("Görev açıklaması zorunludur.");
        }

        if (typeof priority !== "string" ||
            !["low", "medium", "high"].includes(priority)) {
            errors.push("Öncelik low, medium veya high olmalıdır.");
        }

        if (typeof assignee !== "string" || !assignee.trim()) {
            errors.push("Atanan kişi bilgisi zorunludur.");
        }
    }

    // PUT işleminde yalnızca gönderilen alanları kontrol et
    if (req.method === "PUT") {
        if (title !== undefined &&
            (typeof title !== "string" || !title.trim())) {
            errors.push("Görev başlığı boş olamaz.");
        }

        if (description !== undefined &&
            (typeof description !== "string" || !description.trim())) {
            errors.push("Görev açıklaması boş olamaz.");
        }

        if (priority !== undefined &&
            (typeof priority !== "string" ||
                !["low", "medium", "high"].includes(priority))) {
            errors.push("Öncelik low, medium veya high olmalıdır.");
        }

        if (assignee !== undefined &&
            (typeof assignee !== "string" || !assignee.trim())) {
            errors.push("Atanan kişi boş olamaz.");
        }
    }

    // Hatalar varsa isteği durdur
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Gönderilen veriler geçersiz.",
            errors
        });
    }

    // Hata yoksa sonraki aşamaya geç
    next();
};

export default validateTask;
