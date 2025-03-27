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
