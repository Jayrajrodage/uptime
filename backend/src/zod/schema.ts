import { z } from "zod";

export enum ChannelEnum {
  Email = "Email",
  SMS = "SMS",
}

const isValidIndianNumber = (value: string) =>
  /^(?:\+91[-\s]?)?[6-9]\d{9}$/.test(value);

const isValidEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value);

export const channelSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name must be at least 1 characters")
      .max(30, "Name must be less than 30 characters"),
    channel: z.nativeEnum(ChannelEnum),
    channeldata: z
      .string()
      .min(1, "Channel data is required")
      .max(30, "Channel data must be less than 30 characters"),
  })
  .refine(
    (data) => {
      if (data.channel === ChannelEnum.Email)
        return isValidEmail(data.channeldata);
      if (data.channel === ChannelEnum.SMS)
        return isValidIndianNumber(data.channeldata);
      return true;
    },
    {
      message: "Invalid email or phone number format",
      path: ["channeldata"],
    }
  );

export const updateChannelSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name must be at least 1 characters")
      .max(30, "Name must be less than 30 characters"),
    channel: z.nativeEnum(ChannelEnum),
    channeldata: z
      .string()
      .min(1, "Channel data is required")
      .max(30, "Channel data must be less than 30 characters"),
    monitors: z.array(z.number().min(1, "Invalid monitor ID")).default([]),
  })
  .refine(
    (data) => {
      if (data.channel === ChannelEnum.Email)
        return isValidEmail(data.channeldata);
      if (data.channel === ChannelEnum.SMS)
        return isValidIndianNumber(data.channeldata);
      return true;
    },
    {
      message: "Invalid email or phone number format",
      path: ["channeldata"],
    }
  );
