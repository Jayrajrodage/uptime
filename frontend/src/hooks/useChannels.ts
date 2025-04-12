// hooks/useChannels.ts
import { getChannels } from "@/api/channel";
import { Channel } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const useChannels = () => {
  return useQuery<Channel[]>({
    queryKey: ["channels"],
    queryFn: getChannels,
  });
};
