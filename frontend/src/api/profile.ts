// src/api/profile.ts
import axios from "axios";
import { toast } from "sonner";
export const getProfile = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/profile`
    );

    if (!response.data) {
      toast.success("profile not fo");
    }
    return response.data;
  } catch (error: any) {
    console.log("🚀 ~ getProfile ~ error:", error);
    toast.error(error.response.data.message);
  }
};
