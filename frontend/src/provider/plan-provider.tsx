// src/context/PlanContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import { toast } from "sonner";

type Plan = "FREE" | "PRO" | "UNLIMITED";

type PlanContextType = {
  plan: Plan | undefined;
  isLoading: boolean;
  Error: boolean;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [plan, setPlan] = useState<Plan>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [Error, setError] = useState<boolean>(false);
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/profile`,
          { withCredentials: true }
        );
        if (!response.data || !response.data.Profile) {
          toast.error("profile not found");
          return;
        }
        setPlan(response.data.Profile.plan);
      } catch (error: any) {
        console.log("🚀 ~ getProfile ~ error:", error);
        setError(true);
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return (
    <PlanContext.Provider value={{ plan, isLoading, Error }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlans = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlans must be used within a PlanProvider");
  }
  return context;
};
