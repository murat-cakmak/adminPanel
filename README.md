# Admin Panel Taslağı (Next.js + MySQL)

Sektör bağımsız, çoklu tenant destekli bir admin paneli başlangıç paketi. Next.js 14 App Router ve TailwindCSS ile hazırlanmış arayüz taslağı, modüler sektör şablonları ve MySQL veritabanı şeması içerir.

## Özellikler
- 🔐 Login formu ve JWT + Session destekli kimlik akışı için hazır UI
- 🏢 Çoklu tenant, RBAC ve audit tabloları içeren MySQL şeması (`database/schema.sql`)
- 🧩 Perakende, üretim, sağlık, finans ve lojistik için hazır modül/kpi şablonları
- 🎨 TailwindCSS ile tasarlanmış kart, istatistik ve sektör bileşenleri
- 🧭 Üst menü, badge ve kart bileşenleriyle genişletilebilir düzen

## Projeyi Çalıştırma
> Not: Çevrimiçi paket indirme kısıtları nedeniyle bu ortamda `npm install` başarısız olabilir. Aşağıdaki adımlar internet erişimi olan bir ortam içindir.

```bash
npm install
npm run dev
```

## Dosya Yapısı
- `app/` – Next.js App Router sayfaları (`page.tsx`, `login/page.tsx`)
- `components/` – Üst menü, istatistik ve sektör kartı bileşenleri
- `lib/` – Sektör ve navigasyon konfigürasyonları
- `database/schema.sql` – RBAC, tenant ve KPI tablolarını içeren MySQL şeması
- `tailwind.config.ts` – Tema ve içerik tarama ayarları

## Veritabanı Şeması Özeti
- **Kimlik & Yetki**: `tenants`, `users`, `roles`, `permissions`, `user_roles`, `sessions`
- **Audit & Bildirim**: `audit_logs`, `notifications`
- **Sektör & KPI**: `sectors`, `modules`, `kpi_definitions`, `kpi_values`
- **Operasyon**: `projects`, `tasks`, `integration_endpoints`

Şemayı uygulamak için:
```sql
SOURCE database/schema.sql;
```
