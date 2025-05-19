import * as dotenv from 'dotenv';
dotenv.config();

export const clientId: string = process.env.CLIENT_ID ?? '';
export const clientSecret: string = process.env.CLIENT_SECRET ?? '';
export const storeId: string = process.env.STORE_ID ?? '';
export const baseUrl: string = process.env.MODO_BASE_URL ?? '';
export const userAgent: string = 'EmpresaFutura';