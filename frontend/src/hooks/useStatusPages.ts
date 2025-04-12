import { StatusPage } from "@/lib/types";
import { getPages } from "@/api/status-pages";
import { useQuery } from "@tanstack/react-query";

export const useStatusPages = () => {
  return useQuery<StatusPage[]>({
    queryKey: ["statusPages"],
    queryFn: getPages,
  });
};
