import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { createTheme, ThemeProvider } from "@mui/material";
import { useTheme } from "@/provider/theme-provider";
import { Button } from "@/components/ui/button";
import { CustomTabPanel } from "../custom-panel";
import { CreateMonitorInput, monitor } from "@/lib/types";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMonitorDetails, testUrl, updateMonitor } from "@/api/monitor";
import Request from "./create/request";
import ScheduleRegion from "./create/schedule-region";
import Timing from "./create/timing";
import NotificationChannel from "./create/notification-channel";
import Loader from "@/components/ui/loader";
import ErrorComponent from "@/components/ui/error";
import { Send } from "lucide-react";
import { toast } from "sonner";
import DeleteMonitor from "./delete-monitor";
import UpdateStatusPage from "./create/status-page";

const MoniterSettings = () => {
  const { id } = useParams();
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
  });
  const { data, isLoading, isError, isSuccess, refetch } = useQuery<monitor>({
    queryKey: ["channelDetails", id],
    queryFn: () => getMonitorDetails(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        url: data.url,
        isActive: data.isActive,
        headers: data.headers,
        frequency: data.frequency,
        subRegions: data.subRegions.map((region) => region.id),
        timeout: data.timeout,
        notificationChannel: data.notificationChannel.map(
          (notification) => notification.id
        ),
        method: data.method,
        StatusPages: data.StatusPages ? data.StatusPages.id : null,
      });
    }
  }, [data, reset]);
  const mutation = useMutation({
    mutationFn: (input: CreateMonitorInput) => updateMonitor(id!, input),
  });
  const userTheme = useTheme();
  const [tabValue, setTabValue] = React.useState(0);
  const onSubmit = (data: CreateMonitorInput) => {
    if (!id) return;
    toast.promise(mutation.mutateAsync(data), {
      loading: "Updating monitor...",
      success: async () => {
        refetch();
        return "Monitor updated successfully!";
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
    <div>
      {isLoading ? (
        <div className="flex h-screen justify-center items-center">
          <Loader />
        </div>
      ) : isError ? (
        <div className="flex h-screen justify-center items-center">
          <ErrorComponent />
        </div>
      ) : (
        <>
          {isSuccess && (
            <form onSubmit={handleSubmit(onSubmit)} className="py-5">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="flex flex-col gap-1">
                  <h4 className="font-medium text-foreground">
                    Basic Information
                  </h4>
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
                      <p className="text-red-500 text-xs">
                        {errors.name.message}
                      </p>
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
                    onChange={(event: React.SyntheticEvent, newValue: number) =>
                      setTabValue(newValue)
                    }
                    textColor="inherit"
                    variant="scrollable"
                  >
                    <Tab className="!normal-case" label="Requests" />
                    <Tab className="!normal-case" label="Schedule & Regions" />
                    <Tab className="!normal-case" label="Timing " />
                    <Tab className="!normal-case" label="Notifications " />
                    <Tab className="!normal-case" label="Status Page" />
                    <Tab className="!normal-case" label="Danger " />
                  </Tabs>
                  <CustomTabPanel value={tabValue} index={0}>
                    <Request
                      register={register}
                      control={control}
                      errors={errors}
                    />
                    <div className="flex items-end justify-end mt-5">
                      <div className="flex gap-2">
                        <Button
                          onClick={() => testUrl(getValues("url"))}
                          size={"lg"}
                          type="button"
                          variant={"ghost"}
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
                  </CustomTabPanel>
                  <CustomTabPanel value={tabValue} index={1}>
                    <ScheduleRegion
                      control={control}
                      errors={errors}
                      setValue={setValue}
                      getValues={getValues}
                      register={register}
                    />
                    <div className="flex items-end justify-end">
                      <Button
                        disabled={!isValid}
                        type="submit"
                        size={"lg"}
                        className="w-[10rem]"
                      >
                        Confirm
                      </Button>
                    </div>
                  </CustomTabPanel>
                  <CustomTabPanel value={tabValue} index={2}>
                    <Timing register={register} errors={errors} />
                    <div className="flex items-end justify-end">
                      <Button
                        disabled={!isValid}
                        type="submit"
                        size={"lg"}
                        className="w-[10rem]"
                      >
                        Confirm
                      </Button>
                    </div>
                  </CustomTabPanel>
                  <CustomTabPanel value={tabValue} index={3}>
                    <NotificationChannel
                      getValues={getValues}
                      setValue={setValue}
                    />
                    <div className="flex items-end justify-end">
                      <Button
                        disabled={!isValid}
                        type="submit"
                        size={"lg"}
                        className="w-[10rem]"
                      >
                        Confirm
                      </Button>
                    </div>
                  </CustomTabPanel>
                  <CustomTabPanel value={tabValue} index={4}>
                    <UpdateStatusPage
                      setValue={setValue}
                      getValues={getValues}
                    />
                    <div className="flex items-end justify-end">
                      <Button
                        disabled={!isValid}
                        type="submit"
                        size={"lg"}
                        className="w-[10rem]"
                      >
                        Confirm
                      </Button>
                    </div>
                  </CustomTabPanel>
                  <CustomTabPanel value={tabValue} index={5}>
                    <DeleteMonitor id={id} />
                    <div className="flex items-end justify-end">
                      <Button
                        disabled={!isValid}
                        type="submit"
                        size={"lg"}
                        className="w-[10rem]"
                      >
                        Confirm
                      </Button>
                    </div>
                  </CustomTabPanel>
                </ThemeProvider>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default MoniterSettings;
