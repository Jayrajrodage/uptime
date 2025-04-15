import { CreateMonitorInput } from "@/lib/types";
import axios from "axios";
import { toast } from "sonner";

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

export const getMonitorDetails = async (id: string) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/monitor/${id}`,
    { withCredentials: true }
  );
  return res.data.Monitor;
};

export const testUrl = async (url: string) => {
  return toast.promise(axios.get(url), {
    loading: "Testing URL...",
    success: "URL is reachable! ✅",
    error: (err) =>
      err?.response?.status
        ? `Request failed with status ${err.response.status}`
        : "URL is not reachable ❌",
  });
};

export const updateMonitor = async (id: string, data: CreateMonitorInput) => {
  const res = await axios.put(
    `${import.meta.env.VITE_SERVER_URL}/api/monitor/${id}`,
    { data },
    { withCredentials: true }
  );
  return res.data.Monitor;
};

export const deleteMonitor = async (id?: string) => {
  if (!id) return;
  const res = await axios.delete(
    `${import.meta.env.VITE_SERVER_URL}/api/monitor/${id}`,
    { withCredentials: true }
  );
  return res.data;
};
