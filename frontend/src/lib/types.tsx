export type statusWidgetArray = {
  TotalRequest: number;
  TotalFailed: number;
  Date: string;
};

export type statusWidget = {
  TotalRequest: number;
  TotalFailed: number;
  Name: string;
  DayWiseRequests: statusWidgetArray[];
};

interface Trend {
  timestamp: string;
  durationMs: string;
}

export type MoniterTableStats = {
  Region: string;
  Trend: Trend[];
  P50: number;
  P95: number;
  P90: number;
};

export type profile = {
  id: number;
  clerkId: string;
  created_at: Date;
  updated_at: Date;
  plan: "FREE" | "PRO" | "UNLIMITED";
};

export type CreateChannelInput = {
  name: string;
  channel: string;
  channeldata: string;
};

export type UpdateChannelInput = {
  name: string;
  channel: string;
  channeldata: string;
  monitors: number[];
};
interface headers {
  key: string;
  value: string;
}
export enum frequency {
  TenMin = "TenMin",
  TwentyMin = "TwentyMin",
  ThirtyMin = "ThirtyMin",
  OneHr = "OneHr",
}
export type CreateMonitorInput = {
  name: string;
  isActive: boolean;
  url: string;
  headers: headers[];
  frequency: frequency;
  subRegions: number[];
  timeout: number;
  notificationChannel: number[];
  StatusPages: number | null;
  method: string;
};

export interface notificationTableProps {
  channelData: Channel[];
}
interface subRegions {
  id: number;
  name: string;
}
export interface monitor {
  id: number;
  name: string;
  url: string;
  isActive: boolean;
  headers: headers[];
  frequency: frequency;
  subRegions: subRegions[];
  timeout: number;
  notificationChannel: Channel[];
  method: string;
  StatusPages?: StatusPage;
}
export type Channel = {
  id: number;
  name: string;
  channel: string;
  channeldata: string;
  monitors: monitor[];
};

export type StatusPage = {
  id: number;
  title: string;
  slug: string;
  monitors?: monitor;
};

export type InputCreateStatusPage = {
  title: string;
  slug: string;
  monitorId: number | undefined;
};

export interface MonitorQueryResult {
  Monitors: monitor[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface last24HrStats {
  success: number;
  failed: number;
  p50: number;
  p75: number;
  p90: number;
  p95: number;
  p99: number;
}
export interface timing {
  Dns: string;
  Tls: string;
  Transfer: string;
  Ttfb: string;
  Tcp: string;
}
export interface logs {
  date: Date;
  statusCode: number;
  latency: number;
  Region: string;
  Headers: any;
  Timings: any;
}

export interface LogsQueryResult {
  logs: logs[];
  total: number;
  offset: number;
  page: number;
}
