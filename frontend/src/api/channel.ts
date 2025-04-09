import { CreateChannelInput } from "@/lib/types";
import axios from "axios";

export const crateChannel = async ({
  name,
  channel,
  channeldata,
}: CreateChannelInput) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/channel`,
    {
      name,
      channel,
      channeldata,
    },
    { withCredentials: true }
  );
  return data;
};
