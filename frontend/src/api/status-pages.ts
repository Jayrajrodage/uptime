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
