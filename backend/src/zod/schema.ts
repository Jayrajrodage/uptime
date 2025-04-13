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

export const PagesSchema = z.object({
  title: z
    .string()
    .min(1, "title must be at least 1 characters")
    .max(30, "title must be less than 30 characters"),
  slug: z
    .string()
    .min(1, "slug must be at least 1 characters")
    .max(30, "slug must be less than 30 characters"),
  monitorId: z.number().min(1, "Invalid monitor ID").optional().nullable(),
});

export const MonitorSchema = z.object({
  name: z
    .string()
    .min(1, "name must be at least 1 characters")
    .max(30, "name must be less than 30 characters"),
  url: z
    .string()
    .min(1, "url must be at least 1 characters")
    .max(50, "url must be less than 50 characters")
    .url(),
  headers: z
    .array(
      z.object({
        key: z.string().min(1, "Header key is required"),
        value: z.string().min(1, "Header value is required"),
      })
    )
    .default([]),
  frequency: z.enum(["TenMin", "TwentyMin", "OneHr"], {
    required_error: "Frequency is required",
    invalid_type_error: "Invalid frequency value",
  }),
  subRegions: z
    .array(z.number())
    .min(1, "Please select at least one subregion"),
  timeout: z.number().max(10000000, "max timeout exceeded").default(45000),
  notificationChannel: z
    .array(z.number().min(1, "Invalid notification channel"))
    .default([]),
  StatusPages: z.number().min(1, "Invalid status page").optional(),
  isActive: z.boolean().default(true),
  method: z
    .string()
    .min(1, "method is required")
    .max(20, "method length is to big"),
});
