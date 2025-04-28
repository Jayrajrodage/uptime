import { getResponseLogs } from "@/api/monitor";
import { LogsQueryResult } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const useResponseLogs = (
  monitor_id: string,
  offset: number = 1,
  limit: number = 10
) => {
  return useQuery<LogsQueryResult>({
    queryKey: ["responseLogs", offset, limit],
    queryFn: () => getResponseLogs({ monitor_id, offset, limit }),
    enabled: !!monitor_id,
  });
};
