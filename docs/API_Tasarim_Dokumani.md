# TASKFLOW – API TASARIM DOKÜMANI

## 1. Genel Bilgiler

**Proje Adı:** TaskFlow – Görev ve Proje Yönetim Sistemi

**Backend Teknolojisi:** Node.js

**Web Framework:** Express.js

**Veri Saklama:** JSON dosyası (`tasks.json`)

**API Türü:** REST API

**Temel Adres:** `http://localhost:3000`

API, görevlerin oluşturulması, listelenmesi, güncellenmesi, silinmesi ve raporlanması işlemlerini gerçekleştirmek amacıyla geliştirilmiştir.

## 2. Görev Yönetimi Endpointleri

| HTTP Metodu | Endpoint | Açıklama |
|---|---|---|
| GET | `/api/tasks` | Tüm görevleri listeler. |
| GET | `/api/tasks/:id` | Belirli bir görevin detaylarını getirir. |
| POST | `/api/tasks` | Yeni görev oluşturur. |
| PUT | `/api/tasks/:id` | Mevcut görevi günceller. |
| DELETE | `/api/tasks/:id` | Belirli bir görevi siler. |

## 3. Gelişmiş Görev Listeleme Endpointleri

| HTTP Metodu | Endpoint | Açıklama |
|---|---|---|
| GET | `/api/tasks/search?keyword=backend` | Görev başlığı ve açıklamasında arama yapar. |
| GET | `/api/tasks/assignee/:assignee` | Belirli bir çalışana atanmış görevleri listeler. |

### Filtreleme

Görevler durum ve öncelik bilgilerine göre filtrelenebilir.

Örnek istekler:

- `/api/tasks?status=pending`
- `/api/tasks?priority=high`
- `/api/tasks?status=completed&priority=high`

### Sayfalama

Görevlerin belirli sayıda kayıtla sayfalar halinde getirilmesini sağlar.

Örnek:

`/api/tasks?page=1&limit=5`

### Sıralama

Görevler oluşturulma tarihi, başlık veya öncelik alanına göre sıralanabilir.

Örnekler:

- `/api/tasks?sort=createdAt&order=desc`
- `/api/tasks?sort=title&order=asc`
- `/api/tasks?sort=priority&order=desc`

## 4. Raporlama Endpointleri

| HTTP Metodu | Endpoint | Açıklama |
|---|---|---|
| GET | `/api/reports/completed` | Tamamlanan görev sayısını getirir. |
| GET | `/api/reports/pending` | Bekleyen görev sayısını getirir. |
| GET | `/api/reports/summary` | Sistemin genel görev özetini getirir. |

Genel sistem özeti; toplam görev sayısı, tamamlanan görev sayısı, bekleyen görev sayısı ve diğer görev durumlarının dağılımını içerir.

## 5. Görev Veri Modeli

Görev nesnesi aşağıdaki alanlardan oluşur:

| Alan | Veri Tipi | Açıklama |
|---|---|---|
| id | String | Benzersiz görev kimliği |
| title | String | Görev başlığı |
| description | String | Görev açıklaması |
| priority | String | Görev önceliği |
| assignee | String | Atanan çalışan |
| status | String | Görev durumu |
| createdAt | String | Oluşturulma tarihi |

**Öncelik değerleri:** `low`, `medium`, `high`

**Görev durumları:** `pending`, `in-progress`, `completed`

## 6. Veri Doğrulama

Yeni görev oluşturma ve görev güncelleme işlemlerinde Validation Middleware kullanılmaktadır.

Doğrulanan alanlar:

- title
- description
- priority
- assignee

Geçersiz veya eksik veriler gönderildiğinde API, HTTP 400 Bad Request yanıtı döndürür.

## 7. Logger Middleware

Sisteme gelen API istekleri Logger Middleware aracılığıyla konsola kaydedilir.

Kaydedilen bilgiler:

- HTTP metodu
- İstek adresi (endpoint)
- Zaman damgası (timestamp)

## 8. HTTP Durum Kodları

| HTTP Durum Kodu | Açıklama |
|---|---|
| 200 OK | İstek başarıyla tamamlandı. |
| 201 Created | Yeni kayıt oluşturuldu. |
| 400 Bad Request | Geçersiz veya eksik veri gönderildi. |
| 404 Not Found | İstenen görev bulunamadı. |
| 500 Internal Server Error | Sunucu tarafında hata oluştu. |

## 9. Sonuç

TaskFlow REST API, görev yönetimi işlemlerini merkezi bir yapı üzerinden gerçekleştirmek amacıyla geliştirilmiştir. Sistem; CRUD işlemleri, middleware kullanımı, gelişmiş listeleme, arama, filtreleme, sayfalama, sıralama ve raporlama özelliklerini desteklemektedir.