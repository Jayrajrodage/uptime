import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleCheck, CircleX } from "lucide-react";
import DashboardLayout from "../layout";
import { Channel } from "@/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getChannelDetails, updateChannel } from "@/api/channel";
import { useParams } from "react-router-dom";
import Loader from "@/components/ui/loader";
import ErrorComponent from "@/components/ui/error";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UpdateChannelInput } from "@/lib/types";
import { toast } from "sonner";
const NotificationDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess, refetch } = useQuery<Channel>({
    queryKey: ["channelDetails", id],
    queryFn: () => getChannelDetails(id!),
    enabled: !!id,
  });
  const mutation = useMutation({
    mutationFn: (input: UpdateChannelInput) => updateChannel(id!, input),
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<UpdateChannelInput>({
    mode: "onChange",
    defaultValues: {
      name: "",
      channel: "",
      channeldata: "",
      monitors: [],
    },
  });
  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        channel: data.channel,
        channeldata: data.channeldata,
        monitors: data.monitors.map((monitor) => monitor.id),
      });
    }
  }, [data, reset]);
  const selectedMonitorIds = watch("monitors");
  const toggleMonitor = (id: number) => {
    const updated = selectedMonitorIds.includes(id)
      ? selectedMonitorIds.filter((monitorId) => monitorId !== id)
      : [...selectedMonitorIds, id];

    setValue("monitors", updated, { shouldDirty: true });
  };
  const onSubmit = (data: UpdateChannelInput) => {
    if (!id) return;
    toast.promise(mutation.mutateAsync(data), {
      loading: "Updating channel...",
      success: async () => {
        refetch();
        return "Channel updated successfully!";
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
    <DashboardLayout>
      <div className="rounded-xl border border-border p-2 bg-background/70 px-3 py-4 backdrop-blur-lg md:col-span-2">
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
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-7 p-5"
              >
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-5">
                  <div className="flex flex-col gap-1 col-span-1">
                    <h4 className="font-medium text-foreground">Alert</h4>
                    <p className="text-muted-foreground text-sm">
                      Update your channel settings
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 col-span-2">
                    <div className="flex flex-col gap-2 col-span-5">
                      <Label htmlFor="Name">Name</Label>
                      <Input
                        type="text"
                        id="Name"
                        placeholder="Name"
                        {...register("name", {
                          required: "Name is required",
                          maxLength: {
                            value: 30,
                            message: "Name must be less than 30 characters",
                          },
                        })}
                      />
                      <p className="text-muted-foreground">
                        Define a name for the channel.
                      </p>
                      {errors.name && (
                        <p className="text-red-500 text-sm">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    {data.channel === "Email" ? (
                      <div className="flex flex-col gap-2 col-span-5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          type="email"
                          id="email"
                          placeholder="Email"
                          {...register("channeldata", {
                            required: "Email is required",
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: "Invalid email format",
                            },
                          })}
                        />
                        <p className="text-muted-foreground">
                          The email is required.
                        </p>
                        {errors.channeldata && (
                          <p className="text-red-500 text-sm">
                            {errors.channeldata.message}
                          </p>
                        )}
                      </div>
                    ) : data.channel === "SMS" ? (
                      <div className="flex flex-col gap-2 col-span-5">
                        <Label htmlFor="number">Phone number</Label>
                        <Input
                          type="text"
                          id="number"
                          placeholder="+919585959585"
                          {...register("channeldata", {
                            required: "Phone number is required",
                            pattern: {
                              value: /^(?:\+91[-\s]?)?[6-9]\d{9}$/,
                              message: "Invalid Indian Phone number",
                            },
                          })}
                        />
                        <p className="text-muted-foreground">
                          The Phone number is required.
                        </p>
                        {errors.channeldata && (
                          <p className="text-red-500 text-sm">
                            {errors.channeldata.message}
                          </p>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="w-full border-t border-gray-300 my-4"></div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-medium text-foreground">Monitors</h4>
                  <p className="text-muted-foreground text-sm">
                    Attach the notification to specific monitors.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
                  {data.monitors.length > 0 ? (
                    <>
                      {data.monitors.map((monitor) => {
                        const isSelected = selectedMonitorIds.includes(
                          monitor.id
                        );
                        return (
                          <div
                            key={monitor.id}
                            onClick={() => toggleMonitor(monitor.id)}
                            className={`border rounded-lg cursor-pointer ${
                              isSelected
                                ? "border-green-500"
                                : "border-gray-300"
                            }`}
                          >
                            <div className="flex flex-row p-2 items-center justify-between">
                              <div className="flex flex-col gap-1">
                                <h1>{monitor.name}</h1>
                                <p className="text-muted-foreground">
                                  {monitor.url}
                                </p>
                              </div>
                              {isSelected ? (
                                <CircleCheck className="text-green-500" />
                              ) : (
                                <CircleX className="text-gray-400" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <h1 className="">Zero monitors</h1>
                  )}
                </div>
                <div className="flex justify-end py-2">
                  <Button
                    disabled={!isDirty || !isValid || mutation.isPending}
                    className="w-[10rem] h-10"
                  >
                    Confirm
                  </Button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default NotificationDetails;
