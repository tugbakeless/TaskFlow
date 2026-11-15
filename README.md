# TASKFLOW – Görev ve Proje Yönetim Sistemi API

## Proje Hakkında

TaskFlow, ekip içerisindeki görevlerin oluşturulmasını, çalışanlara atanmasını ve görev durumlarının takip edilmesini sağlayan Node.js ve Express.js kullanılarak geliştirilmiş REST API projesidir.

Proje kapsamında görev yönetimi, veri doğrulama, filtreleme, arama, sayfalama, sıralama ve raporlama özellikleri geliştirilmiştir.

## Kullanılan Teknolojiler

- Node.js
- Express.js
- JavaScript
- JSON (veri saklama)
- Nodemon
- Postman

## Proje Klasör Yapısı

```text
TaskFlow/
│
├── src/
│   ├── controllers/
│   │   ├── taskController.js
│   │   └── reportsController.js
│   │
│   ├── data/
│   │   └── tasks.json
│   │
│   ├── middleware/
│   │   ├── logger.js
│   │   └── validateTask.js
│   │
│   ├── routes/
│   │   ├── taskRoutes.js
│   │   └── reportsRoutes.js
│   │
│   └── server.js
│
├── docs/
│   └── API_Tasarim_Dokumani.md
│
├── screenshots/
│
├── package.json
├── package-lock.json
├── README.md
└── TaskFlow_Proje_Tanitim_Dokumani.docx
```

## Kurulum

Projeyi bilgisayarınıza indirdikten sonra aşağıdaki adımları uygulayın.

### 1. Proje klasörüne girin

```bash
cd TaskFlow
```

### 2. Bağımlılıkları yükleyin

```bash
npm install
```

### 3. Geliştirme sunucusunu başlatın

```bash
npm run dev
```

Sunucu varsayılan olarak aşağıdaki adres üzerinden çalışır:

`http://localhost:3000`

## Kullanılabilir Komutlar

| Komut | Açıklama |
|---|---|
| `npm install` | Proje bağımlılıklarını yükler. |
| `npm run dev` | Sunucuyu Nodemon ile başlatır. |
| `npm start` | Sunucuyu normal şekilde başlatır. |

## API Endpointleri

### Görev Yönetimi

| HTTP Metodu | Endpoint | Açıklama |
|---|---|---|
| GET | `/api/tasks` | Tüm görevleri listeler. |
| GET | `/api/tasks/:id` | Görev detayını getirir. |
| POST | `/api/tasks` | Yeni görev oluşturur. |
| PUT | `/api/tasks/:id` | Görevi günceller. |
| DELETE | `/api/tasks/:id` | Görevi siler. |

### Arama ve Filtreleme

| HTTP Metodu | Endpoint | Açıklama |
|---|---|---|
| GET | `/api/tasks/search?keyword=backend` | Görevlerde arama yapar. |
| GET | `/api/tasks/assignee/:assignee` | Çalışana göre görevleri listeler. |
| GET | `/api/tasks?status=pending` | Duruma göre filtreler. |
| GET | `/api/tasks?priority=high` | Önceliğe göre filtreler. |
| GET | `/api/tasks?page=1&limit=5` | Sayfalama uygular. |
| GET | `/api/tasks?sort=createdAt&order=desc` | Görevleri sıralar. |

### Raporlama

| HTTP Metodu | Endpoint | Açıklama |
|---|---|---|
| GET | `/api/reports/completed` | Tamamlanan görev sayısını getirir. |
| GET | `/api/reports/pending` | Bekleyen görev sayısını getirir. |
| GET | `/api/reports/summary` | Genel görev özetini getirir. |

## Görev Veri Yapısı

Görev kayıtları `src/data/tasks.json` dosyasında JSON formatında saklanır.

Her görev aşağıdaki alanları içerir:

- `id`: Benzersiz görev kimliği
- `title`: Görev başlığı
- `description`: Görev açıklaması
- `priority`: Görev önceliği (`low`, `medium`, `high`)
- `assignee`: Atanan çalışan
- `status`: Görev durumu (`pending`, `in-progress`, `completed`)
- `createdAt`: Oluşturulma tarihi

## Middleware

Projede iki temel middleware bulunmaktadır:

- **Logger Middleware:** API isteklerinin HTTP metodunu, endpoint bilgisini ve zaman damgasını konsola kaydeder.
- **Validation Middleware:** Yeni görev oluşturma ve görev güncelleme işlemlerinde gönderilen verileri kontrol eder.

## API Testleri

API endpointleri Postman kullanılarak test edilmiştir.

Görev ekleme, listeleme, detay görüntüleme, güncelleme, silme, filtreleme ve raporlama işlemleri test edilmiştir.

## Veri Saklama

Proje kapsamında görev verileri JSON dosyasında saklanmaktadır. Harici bir veritabanı kullanılmamaktadır.

## Geliştirici

TaskFlow, Node.js Backend Geliştirme eğitimi kapsamında bitirme projesi olarak geliştirilmiştir.
