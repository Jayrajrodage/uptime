import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { MoniterTableStats, statusWidget } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Example dummy data
export const dummyStatusWidget: statusWidget = {
  TotalRequest: 1000,
  TotalFailed: 50,
  Name: "Example Widget",
  DayWiseRequests: Array.from({ length: 45 }, (_, index) => ({
    TotalRequest: Math.floor(Math.random() * 100),
    TotalFailed: Math.floor(Math.random() * 1.1),
    Date: `2025-03-${String(index + 1).padStart(2, "0")}`,
  })),
};

const ChartData = [
  {
    name: "13/10/25",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const MoniterStatsTableData: MoniterTableStats[] = [
  { Region: "North America", Trend: ChartData, P50: 120, P95: 300, P90: 250 },
  { Region: "Europe", Trend: ChartData, P50: 110, P95: 290, P90: 240 },
  { Region: "Asia", Trend: ChartData, P50: 100, P95: 280, P90: 230 },
  { Region: "South America", Trend: ChartData, P50: 90, P95: 270, P90: 220 },
  { Region: "Africa", Trend: ChartData, P50: 80, P95: 260, P90: 210 },
  { Region: "Oceania", Trend: ChartData, P50: 130, P95: 310, P90: 260 },
];

export const regions = [
  {
    name: "North America",
    subRegions: [
      { id: 1, name: "USA", ComingSoon: false },
      { id: 2, name: "Canada", ComingSoon: true },
      { id: 3, name: "Mexico", ComingSoon: true },
    ],
  },
  {
    name: "Europe",
    subRegions: [
      { id: 4, name: "Germany", ComingSoon: true },
      { id: 5, name: "France", ComingSoon: true },
      { id: 6, name: "UK", ComingSoon: false },
    ],
  },
  {
    name: "Asia",
    subRegions: [
      { id: 7, name: "India", ComingSoon: false },
      { id: 8, name: "China", ComingSoon: true },
      { id: 9, name: "Japan", ComingSoon: true },
    ],
  },
  {
    name: "South America",
    subRegions: [
      { id: 10, name: "Brazil", ComingSoon: false },
      { id: 11, name: "Argentina", ComingSoon: true },
      { id: 12, name: "Chile", ComingSoon: true },
    ],
  },
  {
    name: "Africa",
    subRegions: [
      { id: 13, name: "Nigeria", ComingSoon: true },
      { id: 14, name: "South Africa", ComingSoon: false },
      { id: 15, name: "Kenya", ComingSoon: true },
    ],
  },
  {
    name: "Oceania",
    subRegions: [
      { id: 16, name: "Australia", ComingSoon: false },
      { id: 17, name: "New Zealand", ComingSoon: true },
    ],
  },
];

export const notificationChannelsDemo = [
  { name: "lingo", channel: "Email", id: 0 },
  { name: "TriggerX", channel: "Email", id: 1 },
  { name: "boss", channel: "SMS", id: 2 },
];

export const monitorsPageDemo = [
  { id: 0, name: "lingo", url: "https://lingo.com" },
  { id: 1, name: "TriggerX", url: "https://Triggerx.com" },
  { id: 2, name: "boss", url: "https://boss.com" },
];

export const statusPagesDemo = [
  { title: "lingo", id: 0 },
  { title: "TriggerX", id: 1 },
  { title: "boss", id: 2 },
];
