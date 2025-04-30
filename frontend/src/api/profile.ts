// src/api/profile.ts
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
export const getProfile = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/profile`,
    { headers: { Authorization: `Bearer ${Cookies.get("__session")}` } }
  );
  return response.data?.Profile?.plan;
};

export const onPayment = async (id: string) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/profile/payment`,
      {
        priceId: id,
      },
      { headers: { Authorization: `Bearer ${Cookies.get("__session")}` } }
    );
    if (!data) {
      toast.error("something went wrong");
    }
    window.location.assign(data.Url);
  } catch (error: any) {
    console.log("🚀 ~ onPayment ~ error:", error);
    toast.error(error.message);
  }
};
