// TypeScript types for data models
export interface Bot {
  id: string;
  name: string;
  description?: string; // optional description
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

export interface LogSummary {
  id: string;
  created: string;
}

export interface Log {
  id: string;
  created: string;
  message: string;
  bot: string;
  worker: string;
}
