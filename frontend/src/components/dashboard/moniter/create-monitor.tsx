import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { CustomTabPanel } from "../custom-panel";
import { createTheme, ThemeProvider } from "@mui/material";
import { useTheme } from "@/provider/theme-provider";
import { Controller, useForm } from "react-hook-form";
import { CreateMonitorInput, frequency } from "@/lib/types";
import Request from "./create/request";
import ScheduleRegion from "./create/schedule-region";
import Timing from "./create/timing";
import NotificationChannel from "./create/notification-channel";
import { Button } from "@/components/ui/button";
import { Bug, Send } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crateMonitor, testUrl } from "@/api/monitor";
import { toast } from "sonner";
import StatusPage from "./create/status-page";
const CreateMonitor = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm<CreateMonitorInput>({
    mode: "onChange",
    defaultValues: {
      timeout: 45000,
      notificationChannel: [],
      isActive: true,
      method: "GET",
      frequency: frequency.OneHr,
    },
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: CreateMonitorInput) => crateMonitor(data),
  });
  const userTheme = useTheme();
  const [tabValue, setTabValue] = React.useState(0);
  const onSubmit = (data: CreateMonitorInput) => {
    toast.promise(mutation.mutateAsync(data), {
      loading: "Creating monitor...",
      success: async () => {
        reset();
        await queryClient.invalidateQueries({ queryKey: ["monitors"] });
        return "Monitor crated successfully!";
      },
      error: (error: any) => {
        const responseErrors = error?.response?.data?.message;
        if (Array.isArray(responseErrors)) {
          return responseErrors.join(", ");
        }
        return responseErrors || "Something went wrong";
      },
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 overflow-y-auto p-2 mt-2"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="flex flex-col gap-1">
          <h4 className="font-medium text-foreground">Basic Information</h4>
          <p className="text-muted-foreground text-sm">
            Be able to find your monitor easily.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <div className="w-full space-y-2">
              <Label htmlFor="name">Name</Label>

              <Input
                type="text"
                id="name"
                placeholder="name"
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 30,
                    message: "Name must be less than 30 characters",
                  },
                })}
              />
            </div>
            <div className="mt-5 flex flex-row items-center justify-center space-x-1 space-y-0">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Active
              </label>
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex justify-start">
            {errors.name?.message && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>
        </div>
      </div>
      <div className="pt-3">
        <ThemeProvider
          theme={createTheme({
            palette: {
              mode: userTheme.theme === "light" ? "light" : "dark",
            },
          })}
        >
          <Tabs
            value={tabValue}
            onChange={(event: any, value: number) => setTabValue(value)}
            textColor="inherit"
            variant="scrollable"
          >
            <Tab
              className={`!normal-case ${
                errors.url || errors.headers ? "!text-red-600" : ""
              }`}
              label="Requests"
              iconPosition="end"
              icon={errors.url || errors.headers ? <Bug size={15} /> : ""}
            />
            <Tab
              className={`!normal-case ${
                errors.subRegions ? "!text-red-600" : ""
              }`}
              label="Schedule & Regions"
              iconPosition="end"
              icon={errors.subRegions ? <Bug size={15} /> : ""}
            />
            <Tab
              className={`!normal-case ${
                errors.timeout ? "!text-red-600" : ""
              }`}
              label="Timing"
              iconPosition="end"
              icon={errors.timeout ? <Bug size={15} /> : ""}
            />
            <Tab className={`!normal-case`} label="Notifications" />
            <Tab className="!normal-case" label="Status Page" />
          </Tabs>
          <CustomTabPanel value={tabValue} index={0}>
            <Request register={register} errors={errors} control={control} />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
            <ScheduleRegion
              errors={errors}
              control={control}
              setValue={setValue}
              getValues={getValues}
              register={register}
            />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={2}>
            <Timing register={register} errors={errors} />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={3}>
            <NotificationChannel getValues={getValues} setValue={setValue} />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={4}>
            <StatusPage getValues={getValues} setValue={setValue} />
          </CustomTabPanel>
        </ThemeProvider>
      </div>
      {tabValue === 0 && (
        <div className="flex items-end justify-end">
          <div className="flex gap-2">
            <Button
              onClick={() => testUrl(getValues("url"))}
              size={"lg"}
              variant={"ghost"}
              type="button"
            >
              Test
              <Send />
            </Button>
            <Button
              disabled={!isValid}
              type="submit"
              size={"lg"}
              className="w-[10rem]"
            >
              Confirm
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default CreateMonitor;
