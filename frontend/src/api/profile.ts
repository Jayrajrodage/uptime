// src/api/profile.ts
import axios from "axios";
import { toast } from "sonner";
export const getProfile = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/profile`,
      { withCredentials: true }
    );
    if (!response.data) {
      toast.error("profile not found");
      return undefined;
    }
    return response.data.Profile;
  } catch (error: any) {
    console.log("🚀 ~ getProfile ~ error:", error);
    toast.error(error.response.data.message);
  }
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
