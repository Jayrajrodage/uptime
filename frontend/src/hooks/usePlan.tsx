import { getProfile } from "@/api/profile";
import { useQuery } from "@tanstack/react-query";

export const usePlan = () => {
  return useQuery({
    queryKey: ["plan"],
    queryFn: getProfile,
  });
};
