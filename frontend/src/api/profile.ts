// src/api/profile.ts
import axios from "axios";
import { toast } from "sonner";
export const getProfile = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/profile`,
    { withCredentials: true }
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
      { withCredentials: true }
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
