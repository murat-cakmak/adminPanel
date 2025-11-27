-- Örnek veriler: dashboard kartları ve login sayfası için minimum kayıtlar

-- Tenantlar
INSERT INTO tenants (id, name, sector, plan, is_active) VALUES
  ('tenant_demo_primary_000001', 'Demo Holding', 'generic', 'pro', 1),
  ('tenant_demo_secondary_0001', 'Lojistik A.Ş.', 'logistics', 'team', 1);

-- Kullanıcılar
INSERT INTO users (id, tenant_id, email, password_hash, full_name, phone, status, last_login_at)
VALUES
  ('user_demo_admin_000000001', 'tenant_demo_primary_000001', 'admin@ornek.com', 'hashed-password', 'Demo Admin', '+90 555 000 0001', 'active', NOW()),
  ('user_demo_ops_00000000001', 'tenant_demo_primary_000001', 'operasyon@ornek.com', 'hashed-password', 'Operasyon Lideri', '+90 555 000 0002', 'active', NOW() - INTERVAL 1 DAY),
  ('user_demo_guest_000000001', 'tenant_demo_primary_000001', 'misafir@ornek.com', 'hashed-password', 'Misafir Kullanıcı', '+90 555 000 0003', 'invited', NULL);

-- Roller
INSERT INTO roles (id, tenant_id, name, description, scope) VALUES
  ('role_admin_00000000000000001', 'tenant_demo_primary_000001', 'Admin', 'Tüm modüllere erişim', 'platform'),
  ('role_ops_000000000000000001', 'tenant_demo_primary_000001', 'Operasyon', 'Operasyon ve görev yönetimi', 'business'),
  ('role_analytics_0000000000001', 'tenant_demo_primary_000001', 'Analist', 'Raporlama ve KPI izleme', 'analytics');

-- Yetkiler
INSERT INTO permissions (code, description) VALUES
  ('tenant.manage', 'Tenant ve kullanıcı yönetimi'),
  ('modules.manage', 'Modül ve entegrasyon yönetimi'),
  ('tasks.manage', 'Görev ve proje yönetimi'),
  ('kpi.read', 'KPI görüntüleme');

-- Rol-Yetki eşleştirmeleri
INSERT INTO role_permissions (role_id, permission_id) VALUES
  ('role_admin_00000000000000001', 1),
  ('role_admin_00000000000000001', 2),
  ('role_admin_00000000000000001', 3),
  ('role_admin_00000000000000001', 4),
  ('role_ops_000000000000000001', 3),
  ('role_ops_000000000000000001', 4),
  ('role_analytics_0000000000001', 4);

-- Kullanıcı-Rol eşleştirmeleri
INSERT INTO user_roles (user_id, role_id) VALUES
  ('user_demo_admin_000000001', 'role_admin_00000000000000001'),
  ('user_demo_ops_00000000001', 'role_ops_000000000000000001'),
  ('user_demo_guest_000000001', 'role_analytics_0000000000001');

-- Sektörler
INSERT INTO sectors (id, tenant_id, code, name, description) VALUES
  ('sector_retail_demo_000000001', 'tenant_demo_primary_000001', 'retail', 'Perakende', 'Şube, stok, kampanya ve müşteri sadakati yönetimi'),
  ('sector_logistics_demo_00001', 'tenant_demo_secondary_0001', 'logistics', 'Lojistik', 'Taşıma, depo, filo ve saha ekipleri'),
  ('sector_finance_demo_000001', 'tenant_demo_primary_000001', 'finance', 'Finans', 'Portföy, risk ve uyum süreçleri');

-- Modüller
INSERT INTO modules (id, sector_id, name, summary, status) VALUES
  ('module_store_mgmt_0000001', 'sector_retail_demo_000000001', 'Mağaza & Şube Yönetimi', 'Lokasyon, kasa, vardiya ve ciro takibi', 'active'),
  ('module_inventory_00000001', 'sector_retail_demo_000000001', 'Stok & Lojistik', 'Satın alma, envanter seviyesi, tedarikçi SLA', 'active'),
  ('module_customer_cx_000000', 'sector_retail_demo_000000001', 'Müşteri Deneyimi', 'Sadakat programları, iade yönetimi, NPS', 'active'),
  ('module_transport_0000001', 'sector_logistics_demo_00001', 'Taşıma Yönetimi', 'Sevkiyat, rota, teslimat performansı', 'active'),
  ('module_depo_wms_0000001', 'sector_logistics_demo_00001', 'Depo & Envanter', 'WMS, adresleme, sayım, cross-dock', 'active'),
  ('module_risk_finance_00001', 'sector_finance_demo_000001', 'Risk & Uyum', 'AML/KYC, skor kartları, politikalar', 'active'),
  ('module_ops_finance_00001', 'sector_finance_demo_000001', 'Operasyon', 'İş akışı, doküman yönetimi, SLA takibi', 'active');

-- KPI Tanımları
INSERT INTO kpi_definitions (id, tenant_id, module_id, name, unit, description, calculation, data_source) VALUES
  ('kpi_daily_revenue_000001', 'tenant_demo_primary_000001', 'module_store_mgmt_0000001', 'Günlük ciro', 'TRY', 'SUM(order_total)', 'orders'),
  ('kpi_stock_turnover_00001', 'tenant_demo_primary_000001', 'module_inventory_00000001', 'Stok devir hızı', 'turnover', 'COGS/AVG(stock)', 'inventory'),
  ('kpi_nps_retail_0000001', 'tenant_demo_primary_000001', 'module_customer_cx_000000', 'NPS', 'score', 'promoters - detractors', 'surveys'),
  ('kpi_ontime_delivery_0001', 'tenant_demo_secondary_0001', 'module_transport_0000001', 'Zamanında teslimat', 'percent', 'on-time deliveries / total', 'tms'),
  ('kpi_risk_score_fin_00001', 'tenant_demo_primary_000001', 'module_risk_finance_00001', 'Risk skoru', 'score', 'weighted score', 'risk_engine'),
  ('kpi_sla_ops_fin_000001', 'tenant_demo_primary_000001', 'module_ops_finance_00001', 'SLA uyumu', 'percent', 'sla met', 'workflow');

-- KPI Değerleri
INSERT INTO kpi_values (kpi_id, period_start, period_end, value, breakdown) VALUES
  ('kpi_daily_revenue_000001', DATE_SUB(CURDATE(), INTERVAL 30 DAY), CURDATE(), 1250000.50, JSON_OBJECT('currency','TRY')),
  ('kpi_stock_turnover_00001', DATE_SUB(CURDATE(), INTERVAL 90 DAY), CURDATE(), 5.2, JSON_OBJECT('category','Genel')),
  ('kpi_nps_retail_0000001', DATE_SUB(CURDATE(), INTERVAL 30 DAY), CURDATE(), 42, JSON_OBJECT('channel','Mağaza')),
  ('kpi_ontime_delivery_0001', DATE_SUB(CURDATE(), INTERVAL 30 DAY), CURDATE(), 96.4, JSON_OBJECT('region','TR')),
  ('kpi_risk_score_fin_00001', DATE_SUB(CURDATE(), INTERVAL 30 DAY), CURDATE(), 18, JSON_OBJECT('segment','KOBİ')),
  ('kpi_sla_ops_fin_000001', DATE_SUB(CURDATE(), INTERVAL 30 DAY), CURDATE(), 92.5, JSON_OBJECT('process','Kredi'));

-- Projeler
INSERT INTO projects (id, tenant_id, name, owner_id, status, due_date) VALUES
  ('project_ops_ret_0000001', 'tenant_demo_primary_000001', 'Yeni Mağaza Açılışı', 'user_demo_admin_000000001', 'in_progress', CURDATE() + INTERVAL 30 DAY),
  ('project_ops_log_0000001', 'tenant_demo_secondary_0001', 'Rota Optimizasyonu', 'user_demo_ops_00000000001', 'planning', CURDATE() + INTERVAL 45 DAY);

-- Görevler
INSERT INTO tasks (id, project_id, title, assignee_id, status, priority, due_date, metadata) VALUES
  ('task_ret_0000000000001', 'project_ops_ret_0000001', 'POS kurulumu', 'user_demo_admin_000000001', 'in_progress', 'high', CURDATE() + INTERVAL 7 DAY, JSON_OBJECT('location','Ankara')),
  ('task_ret_0000000000002', 'project_ops_ret_0000001', 'Personel eğitimi', 'user_demo_guest_000000001', 'todo', 'medium', CURDATE() + INTERVAL 10 DAY, JSON_OBJECT('team','Mağaza')),
  ('task_log_0000000000001', 'project_ops_log_0000001', 'Yeni rota planı', 'user_demo_ops_00000000001', 'todo', 'high', CURDATE() + INTERVAL 15 DAY, JSON_OBJECT('region','Marmara'));

-- Bildirimler
INSERT INTO notifications (tenant_id, user_id, type, payload, is_read) VALUES
  ('tenant_demo_primary_000001', 'user_demo_admin_000000001', 'task', JSON_OBJECT('title','POS kurulumu'), 0),
  ('tenant_demo_primary_000001', 'user_demo_ops_00000000001', 'kpi', JSON_OBJECT('kpi','SLA uyumu','value',92.5), 0);

-- Entegrasyon uçları
INSERT INTO integration_endpoints (id, tenant_id, name, type, config, last_synced_at) VALUES
  ('integration_webhook_00001', 'tenant_demo_primary_000001', 'Webhook - Mağaza', 'webhook', JSON_OBJECT('url','https://example.com/webhook'), NOW()),
  ('integration_db_00000000001', 'tenant_demo_primary_000001', 'Operasyon DB', 'database', JSON_OBJECT('host','db.internal'), NOW());

-- Oturumlar
INSERT INTO sessions (id, user_id, tenant_id, refresh_token, user_agent, ip_address, expires_at)
VALUES
  ('6f1a2b3c4d5e6f708192a3b4c5d6e7f8', 'user_demo_admin_000000001', 'tenant_demo_primary_000001', 'rt_demo_admin_001', 'Chrome/120 MacOS', '127.0.0.1', NOW() + INTERVAL 30 DAY),
  ('7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d', 'user_demo_ops_00000000001', 'tenant_demo_primary_000001', 'rt_demo_ops_001', 'Safari/17 MacOS', '127.0.0.1', NOW() + INTERVAL 20 DAY),
  ('9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a', 'user_demo_guest_000000001', 'tenant_demo_primary_000001', 'rt_demo_guest_001', 'Edge/120 Windows', '127.0.0.1', NOW() + INTERVAL 10 DAY);

-- Audit logları
INSERT INTO audit_logs (tenant_id, user_id, actor, action, entity, entity_id, metadata, ip_address)
VALUES
  ('tenant_demo_primary_000001', 'user_demo_admin_000000001', 'Demo Admin', 'login', 'user', 'user_demo_admin_000000001', JSON_OBJECT('status','success'), '127.0.0.1'),
  ('tenant_demo_primary_000001', 'user_demo_ops_00000000001', 'Operasyon Lideri', 'create', 'task', 'task_log_0000000000001', JSON_OBJECT('title','Yeni rota planı'), '127.0.0.1'),
  ('tenant_demo_primary_000001', 'user_demo_guest_000000001', 'Misafir Kullanıcı', 'view', 'kpi', 'kpi_nps_retail_0000001', JSON_OBJECT('channel','Mağaza'), '127.0.0.1');
