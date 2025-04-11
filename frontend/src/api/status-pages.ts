import axios from "axios";

export const getPages = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/channel`,
    { withCredentials: true }
  );
  return res.data.Pages;
};
