import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import { CustomTabPanel } from "../custom-panel";
import { Tabs, Tab } from "@mui/material";
import DashboardLayout from "../layout";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { InputCreateStatusPage, StatusPage } from "@/lib/types";
import {
  deletePage,
  getStatusPageDetails,
  updatePage,
} from "@/api/status-pages";
import Loader from "@/components/ui/loader";
import ErrorComponent from "@/components/ui/error";
import { useForm } from "react-hook-form";
import { CircleCheck, CircleX } from "lucide-react";
import { toast } from "sonner";

const StatusPageDetails = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = React.useState(0);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<InputCreateStatusPage>({
    mode: "onChange",
  });

  const title = watch("title");
  const monitor = watch("monitorId");
  useEffect(() => {
    if (title) {
      const slug = title.toLowerCase().replace(/\s+/g, "-");
      setValue("slug", slug);
    }
  }, [title, setValue]);
  const { data, isLoading, isError, isSuccess, refetch } = useQuery<StatusPage>(
    {
      queryKey: ["statusPageDetails", id],
      queryFn: () => getStatusPageDetails(id!),
      enabled: !!id,
    }
  );
  const mutation = useMutation({
    mutationFn: (input: InputCreateStatusPage) => updatePage(id!, input),
  });
  const deleteMutation = useMutation({
    mutationFn: () => deletePage(id!),
  });

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        slug: data.slug,
        monitorId: data.monitors ? data.monitors.id : undefined,
      });
    }
  }, [data, reset]);

  const onSubmit = (data: InputCreateStatusPage) => {
    if (!id) return;
    toast.promise(mutation.mutateAsync(data), {
      loading: "Updating status page...",
      success: async () => {
        refetch();
        return "status page updated successfully!";
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl border border-border p-2 bg-background/70 px-3 py-4 backdrop-blur-lg md:col-span-2 flex flex-col gap-7"
      >
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
              <>
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-semibold">{data.title}</h1>
                  <a
                    className="border-2  px-2 rounded-xl hover:bg-secondary/80"
                    href={`https://${data.slug}`}
                    target="_blank"
                  >
                    visit
                  </a>
                </div>
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-5">
                  <div className="flex flex-col gap-1 col-span-1">
                    <h4 className="font-medium text-foreground">
                      Basic information
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      The public status page to update your users on service
                      uptime.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 col-span-2">
                    <div className="flex flex-col gap-2 col-span-5">
                      <Label htmlFor="Title">Title</Label>
                      <Input
                        type="text"
                        id="Title"
                        placeholder="Title"
                        {...register("title", {
                          required: "Title is required",
                          maxLength: {
                            value: 30,
                            message: "Title must be less than 30 characters",
                          },
                        })}
                      />
                      <p className="text-muted-foreground">
                        The title of your page.
                      </p>
                      {errors.title && (
                        <p className="text-red-500 text-sm">
                          {errors.title.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 col-span-5">
                      <Label htmlFor="Slug">Slug</Label>
                      <div className="flex">
                        <Input
                          type="text"
                          id="Slug"
                          placeholder="Slug"
                          {...register("slug")}
                          readOnly
                        />
                        <div className="dark:bg-gray-500 bg-gray-400 w-[10rem] flex justify-center items-center rounded-tr-lg rounded-ee-lg">
                          .uptime.dev
                        </div>
                      </div>
                      <p className="text-muted-foreground">
                        The subdomain for your status page. At least 3 chars.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <Tabs
                    value={tabValue}
                    onChange={(
                      _event: React.SyntheticEvent,
                      newValue: number
                    ) => setTabValue(newValue)}
                    textColor="inherit"
                    variant="scrollable"
                  >
                    <Tab className="!normal-case" label="Moniters" />
                    <Tab className="!normal-case" label="Dangers" />
                  </Tabs>
                  <CustomTabPanel value={tabValue} index={0}>
                    <div className="flex flex-col gap-5">
                      <div>
                        <div className="flex flex-col gap-1">
                          <h4 className="font-medium text-foreground">
                            Connected Monitors
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            Select the monitors you want to display on your
                            status page. Change the order by using the
                            right-side handle. Inactive monitors will not be
                            shown.
                          </p>
                        </div>
                      </div>
                      <div className="max-w-1/4">
                        <div className="flex flex-col gap-2 col-span-2">
                          {data.monitors ? (
                            <div
                              onClick={() => {
                                if (monitor === data.monitors?.id) {
                                  setValue("monitorId", undefined, {
                                    shouldValidate: true,
                                  });
                                } else {
                                  setValue("monitorId", data.monitors?.id, {
                                    shouldValidate: true,
                                  });
                                }
                              }}
                              className={`border rounded-lg cursor-pointer select-none ${
                                monitor ? "border-green-500" : "border-gray-300"
                              }`}
                            >
                              <div className="flex flex-row p-2 items-center justify-between">
                                <div className="flex flex-col gap-1">
                                  <h1>{data.monitors?.name}</h1>
                                  <p className="text-muted-foreground">
                                    {data.monitors?.url}
                                  </p>
                                </div>
                                {monitor ? (
                                  <CircleCheck className="text-green-500" />
                                ) : (
                                  <CircleX className="text-gray-400" />
                                )}
                              </div>
                            </div>
                          ) : (
                            <h1>No monitors are connected</h1>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-end py-2">
                        <Button
                          type="submit"
                          className="w-[10rem] h-10"
                          disabled={!isValid || mutation.isPending}
                        >
                          {mutation.isPending ? "Submitting..." : "Confirm"}
                        </Button>
                      </div>
                    </div>
                  </CustomTabPanel>
                  <CustomTabPanel value={tabValue} index={1}>
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1">
                        <div>
                          <h4 className="font-medium text-foreground">
                            Danger Zone
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            Be aware of the changes you are about to make.
                          </p>
                        </div>
                        <div className="flex items-center justify-start gap-5 mt-5">
                          <Button
                            type="button"
                            onClick={() => {
                              toast.promise(deleteMutation.mutateAsync(), {
                                loading: "Deleting status page...",
                                success: async () => {
                                  navigate("/dashboard/status-pages");
                                  return "Status page deleted successfully!";
                                },
                                error: (error: any) => {
                                  const responseErrors =
                                    error?.response?.data?.message;
                                  return (
                                    responseErrors || "Something went wrong"
                                  );
                                },
                              });
                            }}
                            disabled={deleteMutation.isPending}
                            className="bg-red-500 hover:bg-red-400"
                          >
                            Delete
                          </Button>
                          <p className="text-red-500">
                            This action cannot be undone. This will permanently
                            delete the monitor.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CustomTabPanel>
                </div>
              </>
            )}
          </>
        )}
      </form>
    </DashboardLayout>
  );
};

export default StatusPageDetails;
