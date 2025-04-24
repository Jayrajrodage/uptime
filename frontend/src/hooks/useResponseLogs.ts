import { getResponseLogs } from "@/api/monitor";
import { LogsQueryResult } from "@/lib/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useResponseLogs = (
  monitor_id: string,
  offset: number = 1,
  limit: number = 10
) => {
  return useQuery<LogsQueryResult>({
    queryKey: ["responseLogs", offset, limit],
    queryFn: () => getResponseLogs({ monitor_id, offset, limit }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 1,
    enabled: !!monitor_id,
  });
};
