// src/hooks/useMonitors.ts
import { getMonitors } from "@/api/monitor";
import { MonitorQueryResult } from "@/lib/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useMonitors = (page: number = 1, limit: number = 10) => {
  return useQuery<MonitorQueryResult>({
    queryKey: ["monitors", page, limit],
    queryFn: () => getMonitors({ page, limit }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 1, // optional: 1 minute stale time
  });
};
