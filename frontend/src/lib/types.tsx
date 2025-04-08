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
