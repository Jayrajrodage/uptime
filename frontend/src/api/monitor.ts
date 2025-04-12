import { CreateMonitorInput } from "@/lib/types";
import axios from "axios";

export const crateMonitor = async (inputData: CreateMonitorInput) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/monitor`,
    {
      inputData,
    },
    { withCredentials: true }
  );
  return data;
};

export const getMonitorNames = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/monitor/names`,
    { withCredentials: true }
  );
  return res.data.Monitors;
};
