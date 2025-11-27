-- Çoklu sektör uyumlu admin paneli için MySQL şeması
-- Çoklu tenant, RBAC, audit ve modüler sektör tabloları içerir.

CREATE TABLE tenants (
    id CHAR(50) NOT NULL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    sector ENUM('retail','manufacturing','healthcare','finance','logistics','generic') DEFAULT 'generic',
    plan VARCHAR(60) DEFAULT 'pro',
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE users (
    id CHAR(50) NOT NULL PRIMARY KEY,
    tenant_id CHAR(50) NOT NULL,
    email VARCHAR(180) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(160) NOT NULL,
    phone VARCHAR(40),
    status ENUM('active','disabled','invited') DEFAULT 'active',
    last_login_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_users_tenants FOREIGN KEY (tenant_id) REFERENCES tenants(id)
) ENGINE=InnoDB;

CREATE TABLE roles (
    id CHAR(50) NOT NULL PRIMARY KEY,
    tenant_id CHAR(50) NOT NULL,
    name VARCHAR(80) NOT NULL,
    description VARCHAR(240),
    scope ENUM('platform','business','analytics') DEFAULT 'business',
    CONSTRAINT fk_roles_tenants FOREIGN KEY (tenant_id) REFERENCES tenants(id)
) ENGINE=InnoDB;

CREATE TABLE permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(120) NOT NULL UNIQUE,
    description VARCHAR(240)
) ENGINE=InnoDB;

CREATE TABLE role_permissions (
    role_id CHAR(50) NOT NULL,
    permission_id INT NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    CONSTRAINT fk_role_permissions_role FOREIGN KEY (role_id) REFERENCES roles(id),
    CONSTRAINT fk_role_permissions_permission FOREIGN KEY (permission_id) REFERENCES permissions(id)
) ENGINE=InnoDB;

CREATE TABLE user_roles (
    user_id CHAR(50) NOT NULL,
    role_id CHAR(50) NOT NULL,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_user_roles_role FOREIGN KEY (role_id) REFERENCES roles(id)
) ENGINE=InnoDB;

CREATE TABLE sessions (
    id CHAR(32) NOT NULL PRIMARY KEY,
    user_id CHAR(50) NOT NULL,
    tenant_id CHAR(50) NOT NULL,
    refresh_token VARCHAR(255),
    user_agent VARCHAR(200),
    ip_address VARCHAR(64),
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sessions_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_sessions_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id)
) ENGINE=InnoDB;

CREATE TABLE audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tenant_id CHAR(50) NOT NULL,
    user_id CHAR(50) NULL,
    actor VARCHAR(160),
    action VARCHAR(120) NOT NULL,
    entity VARCHAR(120) NOT NULL,
    entity_id VARCHAR(120) NOT NULL,
    metadata JSON,
    ip_address VARCHAR(64),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_audit_entity (tenant_id, entity, entity_id),
    CONSTRAINT fk_audit_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id)
) ENGINE=InnoDB;

CREATE TABLE sectors (
    id CHAR(50) NOT NULL PRIMARY KEY,
    tenant_id CHAR(50) NOT NULL,
    code VARCHAR(80) NOT NULL,
    name VARCHAR(120) NOT NULL,
    description VARCHAR(240),
    CONSTRAINT fk_sectors_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id)
) ENGINE=InnoDB;

CREATE TABLE modules (
    id CHAR(50) NOT NULL PRIMARY KEY,
    sector_id CHAR(50) NOT NULL,
    name VARCHAR(120) NOT NULL,
    summary VARCHAR(240),
    status ENUM('active','disabled') DEFAULT 'active',
    config JSON,
    CONSTRAINT fk_modules_sector FOREIGN KEY (sector_id) REFERENCES sectors(id)
) ENGINE=InnoDB;

CREATE TABLE kpi_definitions (
    id CHAR(50) NOT NULL PRIMARY KEY,
    tenant_id CHAR(50) NOT NULL,
    module_id CHAR(50) NOT NULL,
    name VARCHAR(160) NOT NULL,
    unit VARCHAR(50),
    description VARCHAR(240),
    calculation TEXT,
    data_source VARCHAR(160),
    CONSTRAINT fk_kpi_module FOREIGN KEY (module_id) REFERENCES modules(id),
    CONSTRAINT fk_kpi_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id)
) ENGINE=InnoDB;

CREATE TABLE kpi_values (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    kpi_id CHAR(50) NOT NULL,
    period_start DATE,
    period_end DATE,
    value DECIMAL(18,4),
    breakdown JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_kpi_values_def FOREIGN KEY (kpi_id) REFERENCES kpi_definitions(id)
) ENGINE=InnoDB;

CREATE TABLE projects (
    id CHAR(50) NOT NULL PRIMARY KEY,
    tenant_id CHAR(50) NOT NULL,
    name VARCHAR(160) NOT NULL,
    owner_id CHAR(50) NOT NULL,
    status ENUM('idea','planning','in_progress','done','on_hold') DEFAULT 'planning',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_projects_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id),
    CONSTRAINT fk_projects_owner FOREIGN KEY (owner_id) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE tasks (
    id CHAR(50) NOT NULL PRIMARY KEY,
    project_id CHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    assignee_id CHAR(50),
    status ENUM('todo','in_progress','done','blocked') DEFAULT 'todo',
    priority ENUM('low','medium','high','critical') DEFAULT 'medium',
    due_date DATE,
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_tasks_project FOREIGN KEY (project_id) REFERENCES projects(id),
    CONSTRAINT fk_tasks_assignee FOREIGN KEY (assignee_id) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tenant_id CHAR(50) NOT NULL,
    user_id CHAR(50) NOT NULL,
    type VARCHAR(80) NOT NULL,
    payload JSON,
    is_read TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notifications_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id),
    CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE integration_endpoints (
    id CHAR(50) NOT NULL PRIMARY KEY,
    tenant_id CHAR(50) NOT NULL,
    name VARCHAR(120) NOT NULL,
    type ENUM('webhook','database','sftp','queue') NOT NULL,
    config JSON,
    last_synced_at DATETIME,
    CONSTRAINT fk_integrations_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id)
) ENGINE=InnoDB;

-- Performans için örnek index'ler
CREATE INDEX idx_users_tenant_email ON users(tenant_id, email);
CREATE INDEX idx_sessions_expires ON sessions(expires_at);
CREATE INDEX idx_tasks_project_status ON tasks(project_id, status);
CREATE INDEX idx_kpi_values_period ON kpi_values(period_start, period_end);
