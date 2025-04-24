import { CreateMonitorInput } from "@/lib/types";
import { getQuantile } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";

export const crateMonitor = async (inputData: CreateMonitorInput) => {
  try {
    await axios.get(inputData.url, {
      timeout: 5000,
    });
    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/monitor`,
      { inputData },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    toast.error("Monitor URL is not reachable or invalid.");
    throw new Error("Monitor URL is not reachable or invalid.");
  }
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
  try {
    await axios.get(data.url, { timeout: 5000 });
    const res = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/api/monitor/${id}`,
      { data },
      { withCredentials: true }
    );
    return res.data.Monitor;
  } catch (error) {
    toast.error("Monitor URL is not reachable or invalid.");
    throw Error();
  }
};

export const deleteMonitor = async (id?: string) => {
  if (!id) return;
  const res = await axios.delete(
    `${import.meta.env.VITE_SERVER_URL}/api/monitor/${id}`,
    { withCredentials: true }
  );
  return res.data;
};

export const getMonitors = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  const response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/monitor`,
    {
      params: { page, limit },
      withCredentials: true,
    }
  );
  return response.data;
};

export const getMonitorInfo = async (id: string) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/monitor/info/${id}`,
    { withCredentials: true }
  );
  return res.data.Monitor;
};

export const getLast24Stats = async (id: string) => {
  const res = await axios.get(
    `https://api.us-east.aws.tinybird.co/v0/pipes/last_24hr.ndjson?monitor_id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TINYBIRD_API}`,
      },
    }
  );
  return res.data;
};

export const getLast24StatsByRegion = async (id: string) => {
  const api = import.meta.env.VITE_TINYBIRD_API;
  const res = await axios.get(
    `https://api.us-east.aws.tinybird.co/v0/pipes/by_region.json?monitor_id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${api}`,
      },
    }
  );

  const rawData = res.data?.data;

  const enhanced = rawData.map((region: any) => {
    const durations = region.Trend.map((t: any) =>
      parseFloat(t.durationMs)
    ).sort((a: number, b: number) => a - b);

    const p50 = getQuantile(durations, 0.5);
    const p90 = getQuantile(durations, 0.9);
    const p95 = getQuantile(durations, 0.95);

    return {
      ...region,
      P50: p50.toFixed(),
      P90: p90.toFixed(),
      P95: p95.toFixed(),
    };
  });

  return enhanced;
};

export const getResponseLogs = async ({
  monitor_id,
  offset = 1,
  limit = 10,
}: {
  monitor_id: string;
  offset?: number;
  limit?: number;
}) => {
  const api = import.meta.env.VITE_TINYBIRD_API;
  const response = await axios.get(
    `https://api.us-east.aws.tinybird.co/v0/pipes/monitor_logs.json`,
    {
      params: { monitor_id: parseInt(monitor_id), offset, limit },
      headers: {
        Authorization: `Bearer ${api}`,
      },
    }
  );
  return response.data?.data[0];
};
