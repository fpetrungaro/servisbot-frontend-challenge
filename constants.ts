// src/constants.ts
export const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://servisbot-production-url.com/data'
  : 'http://localhost:3000/data';

// Base URL for your data
export const BOTS_URL = `${API_URL}/bots.json`;
export const WORKERS_URL = `${API_URL}/workers.json`; 
export const LOGS_URL = `${API_URL}/logs.json`;

