import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { statusWidget } from "./types";

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
