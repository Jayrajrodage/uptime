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

export type MoniterTableStats = {
  Region: string;
  Trend: any;
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
