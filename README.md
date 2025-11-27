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
- `lib/` – DB bağlantısı (`lib/db.ts`) ve dashboard veri yardımcıları (`lib/dashboardData.ts`)
- `database/schema.sql` – RBAC, tenant ve KPI tablolarını içeren MySQL şeması
- `database/seed.sql` – Demo veriler (tenant, kullanıcı, sektör, modül, KPI)
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

## Veritabanı Bağlantısı
1) Ortam değişkenlerini ayarla:
```bash
cp .env.example .env.local
# DB_HOST, DB_USER, DB_PASSWORD, DB_NAME değerlerini MySQL kurulumuna göre güncelle
```
2) MySQL'de veritabanını oluşturup şemayı yükle:
```bash
mysql -u root -p -e "CREATE DATABASE admin_panel DEFAULT CHARACTER SET utf8mb4;"
mysql -u root -p admin_panel < database/schema.sql
```
Demo veriyi yüklemek için:
```bash
mysql -u root -p admin_panel < database/seed.sql
```
3) Next.js içinde bağlanmak için `lib/db.ts` hazır:
```ts
import { query, pingDatabase } from '@/lib/db';

// sorgu örneği
const tenants = await query<{ id: string; name: string }>('SELECT id, name FROM tenants');

// sağlık kontrolü
await pingDatabase();
```
