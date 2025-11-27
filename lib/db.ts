import { createPool, Pool, PoolOptions } from 'mysql2/promise';

const poolOptions: PoolOptions = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'YeniSifre123!',
  database: process.env.DB_NAME || 'admin_panel',
  waitForConnections: true,
  connectionLimit: 10,
  timezone: 'Z',
};

const globalForMySql = globalThis as unknown as {
  mysqlPool?: Pool;
};

export const mysqlPool =
  globalForMySql.mysqlPool || createPool(poolOptions);

if (process.env.NODE_ENV !== 'production') {
  globalForMySql.mysqlPool = mysqlPool;
}

export async function pingDatabase() {
  const connection = await mysqlPool.getConnection();
  try {
    await connection.ping();
  } finally {
    connection.release();
  }
}

export async function query<T = unknown>(sql: string, params: unknown[] = []) {
  const [rows] = await mysqlPool.query<T[]>(sql, params);
  return rows;
}
