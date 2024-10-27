// TypeScript types for data models
export interface Bot {
  id: string;
  name: string;
  description?: string;
  status: 'DISABLED' | 'ENABLED' | 'PAUSED';
  created: number;
}

export interface Worker {
  id: string;
  name: string;
  description?: string;
  bot: string;
  created: number;
}

export interface Log {
  id: string;
  created: number;
  message: string;
  bot: string;
  worker: string;
}
