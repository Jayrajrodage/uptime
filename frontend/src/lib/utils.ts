import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { MoniterTableStats, statusWidget } from "./types";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { deleteMonitor } from "@/api/monitor";
import { toast } from "sonner";

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

export function getQuantile(data: number[], quantile: number): number {
  if (!data.length) return 0;

  const sorted = [...data].sort((a, b) => a - b);
  const index = quantile * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);

  if (lower === upper) return sorted[lower];
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower);
}

export const onDeleteMonitor = (
  id: any,
  deleteMutation: UseMutationResult<any, Error, string, unknown>
) => {
  toast.promise(deleteMutation.mutateAsync(`${id}`), {
    loading: "Deleting monitor...",
    success: async () => {
      return "Monitor deleted successfully!";
    },
    error: (error: any) => {
      const responseErrors = error?.response?.data?.message;
      return responseErrors || "Something went wrong";
    },
  });
};
