import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { UseMutationResult } from "@tanstack/react-query";
import { toast } from "sonner";
import MainApp from "@/MainApp";
import StatusPageApp from "@/StatusPage";
import { statusWidget } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Example dummy data
export const dummyStatusWidget: statusWidget = {
  TotalRequest: "900",
  TotalFailed: "10",
  TotalSuccess: "890",
  Name: "Ping",
  DayWiseRequests: Array.from({ length: 45 }).map((_, index) => {
    const success = Math.floor(Math.random() * 30 + 20); // random 20-50
    const failed = Math.floor(Math.random() * 1.1); // random 0-5

    const today = new Date();
    today.setDate(today.getDate() - (44 - index)); // 45 days ago to today

    return {
      totalSuccess: success.toString(),
      totalFailed: failed.toString(),
      date: today.toISOString().split("T")[0], // YYYY-MM-DD format
    };
  }),
};

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
      window.location.href = "/dashboard/moniters";
      return "Monitor deleted successfully!";
    },
    error: (error: any) => {
      const responseErrors = error?.response?.data?.message;
      return responseErrors || "Something went wrong";
    },
  });
};

export const getApp = () => {
  const host = window.location.hostname;
  const subDomain = getSubDomain(host);
  if (!subDomain) return MainApp;
  return StatusPageApp;
};

const getSubDomain = (host: string): string | null => {
  // Handle localhost (e.g., sub.localhost)
  if (host.includes("localhost")) {
    const parts = host.split(".");
    return parts.length > 1 ? parts[0] : null;
  }

  // Remove 'www' if present
  const cleanedHost = host.startsWith("www.") ? host.slice(4) : host;

  // Match only subdomain.uptimely.top
  const parts = cleanedHost.split(".");

  if (parts.length === 3 && parts[1] === "uptimely" && parts[2] === "top") {
    return parts[0]; // Return the subdomain
  }

  return null; // Disallow anything else
};
