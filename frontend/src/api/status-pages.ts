import { InputCreateStatusPage } from "@/lib/types";
import axios from "axios";

export const getPages = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/status-pages`,
    { withCredentials: true }
  );
  return res.data.Pages;
};

export const crateStatusPage = async (inputData: InputCreateStatusPage) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/status-pages`,
    {
      inputData,
    },
    { withCredentials: true }
  );
  return data;
};

export const getStatusPageDetails = async (id: string) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/status-pages/${id}`,
    { withCredentials: true }
  );
  return res.data.Page;
};

export const updatePage = async (id: string, data: InputCreateStatusPage) => {
  const res = await axios.put(
    `${import.meta.env.VITE_SERVER_URL}/api/status-pages/${id}`,
    { ...data, monitorId: data.monitorId ?? null },
    { withCredentials: true }
  );
  return res.data.Page;
};

export const deletePage = async (id: string) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_SERVER_URL}/api/status-pages/${id}`,
    { withCredentials: true }
  );
  return res.data;
};

export const getPageStats = async (slug: string) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/status-pages/data/${slug}`
  );
  return res.data.page;
};
