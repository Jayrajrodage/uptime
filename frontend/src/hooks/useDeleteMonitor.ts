import { deleteMonitor } from "@/api/monitor";
import { useMutation } from "@tanstack/react-query";

export const useDeleteMonitor = () => {
  return useMutation({
    mutationFn: (id: string) => deleteMonitor(id),
  });
};
