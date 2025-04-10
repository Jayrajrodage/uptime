import { CreateChannelInput, UpdateChannelInput } from "@/lib/types";
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

export const getChannels = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/channel`,
    { withCredentials: true }
  );
  return res.data.Channels;
};

export const getChannelDetails = async (id: string) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/channel/${id}`,
    { withCredentials: true }
  );
  return res.data.Channel;
};

export const updateChannel = async (id: string, data: UpdateChannelInput) => {
  const res = await axios.put(
    `${import.meta.env.VITE_SERVER_URL}/api/channel/${id}`,
    { data },
    { withCredentials: true }
  );
  return res.data.Channel;
};

export const deleteChannel = async (id: number) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_SERVER_URL}/api/channel/${id}`,
    { withCredentials: true }
  );
  return res.data;
};
