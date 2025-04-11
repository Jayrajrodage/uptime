import React from "react";
import {
  SelectContent,
  SelectGroup,
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { CustomTabPanel } from "../custom-panel";
import { createTheme, ThemeProvider } from "@mui/material";
import { useTheme } from "@/provider/theme-provider";
import { Button } from "@/components/ui/button";
import {
  data,
  monitorsDemo,
  notificationChannelsDemo,
  regions,
} from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { CreateMonitorInput } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
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
    defaultValues: { timeout: 45000, notificationChannel: [] },
  });
  register("subRegions", {
    validate: (value) =>
      (value && value.length > 0) || "At least one region must be selected",
  });
  const userTheme = useTheme();
  const [tabValue, setTabValue] = React.useState(0);
  const [selectedChannels, setSelectedChannels] = React.useState<string[]>([]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const toggleRegion = (id: number) => {
    const current = getValues("subRegions") || [];
    const updated = current.includes(id)
      ? current.filter((i) => i !== id)
      : [...current, id];

    setValue("subRegions", updated, { shouldValidate: true });
  };

  const toggleChannel = (id: number) => {
    const current = getValues("notificationChannel") || [];
    const isSelected = current.includes(id);
    const updated = isSelected
      ? current.filter((item) => item !== id)
      : [...current, id];

    setValue("notificationChannel", updated, { shouldValidate: true });
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "headers",
  });
  return (
    <div className="flex-1 overflow-y-auto p-2 mt-2">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="flex flex-col gap-1">
          <h4 className="font-medium text-foreground">Basic Information</h4>
          <p className="text-muted-foreground text-sm">
            Be able to find your monitor easily.
          </p>
        </div>
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
            onChange={handleChange}
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
            <div className="flex flex-col gap-5">
              <div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-medium text-foreground">
                    Request Settings
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Update your <span className="underline">HTTP</span> request.
                    Add custom headers, payload and test your endpoint before
                    submitting.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-7 grid-cols-1">
                <div className="flex flex-col gap-2 col-span-2">
                  <Label htmlFor="method">Method</Label>
                  <Controller
                    name="method"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={"GET"}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="GET">GET</SelectItem>
                            <SelectItem disabled value="POST">
                              POST (Coming Soon)
                            </SelectItem>
                            <SelectItem disabled value="PUT">
                              PUT (Coming Soon)
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2 col-span-5">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    type="text"
                    id="url"
                    placeholder="URL"
                    {...register("url", {
                      required: "URL is required",
                      pattern: {
                        value:
                          /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=.]+)?$/,
                        message: "Enter a valid URL",
                      },
                    })}
                  />
                  {errors.url && (
                    <span className="text-red-500 text-sm">
                      {errors.url.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Request Header</Label>
                {fields.map((header, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex flex-col gap-2 flex-1">
                      <Label>key</Label>
                      <Input
                        type="text"
                        placeholder="key"
                        key={header.id}
                        {...register(`headers.${index}.key` as const, {
                          required: "Header key is required",
                        })}
                      />
                      {errors.headers?.[index]?.key && (
                        <p className="text-sm text-red-500">
                          {errors.headers[index]?.key?.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <Label>value</Label>
                      <Input
                        type="text"
                        placeholder="value"
                        key={header.id}
                        {...register(`headers.${index}.value` as const, {
                          required: "header value is required",
                        })}
                      />
                      {errors.headers?.[index]?.value && (
                        <p className="text-sm text-red-500">
                          {errors.headers[index]?.value?.message}
                        </p>
                      )}
                    </div>

                    {fields.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <Label>Remove</Label>
                        <Button
                          variant="destructive"
                          onClick={() => remove(index)}
                        >
                          -
                        </Button>
                      </div>
                    )}
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={() => append({ key: "", value: "" })}
                >
                  + Add Custom Header
                </Button>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <h4 className="font-medium text-foreground">
                  Schedule and Regions
                </h4>
                <p className="text-muted-foreground text-sm">
                  Customize the period of time and the regions where your
                  endpoint will be monitored.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="Frequency">Frequency</Label>
                  <Controller
                    name="method"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={"10m"}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="10m">10 minutes</SelectItem>
                            <SelectItem value="30m">20 minutes</SelectItem>
                            <SelectItem value="1hr">1 hour</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <p className="text-muted-foreground text-sm">
                  Frequency of how often your endpoint will be pinged.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex flex-col gap-2">
                  <h1 className="font-medium">Region</h1>
                  <div className="grid gap-5">
                    {errors.subRegions && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.subRegions.message}
                      </p>
                    )}
                    {regions.map((region) => (
                      <div key={region.name} className="flex flex-col gap-3">
                        <h5 className="text-sm">{region.name}</h5>
                        <div className="grid grid-cols-3 gap-2">
                          {region.subRegions.map((sub) => {
                            const selected = (
                              getValues("subRegions") || []
                            ).includes(sub.id);

                            return (
                              <Button
                                key={sub.id}
                                variant={selected ? "default" : "outline"}
                                onClick={() => toggleRegion(sub.id)}
                                className="text-sm"
                              >
                                {sub.name}
                                {selected ? (
                                  <CircleCheck className="ml-1 h-4 w-4" />
                                ) : null}
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm mt-2">
                    Select the regions you want to monitor your endpoint from.{" "}
                    <br />
                    <span className="text-xs">
                      Only a few regions are available in the free plan. Upgrade
                      to access all regions.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={2}>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <h4 className="font-medium text-foreground">Timing Setting</h4>
                <p className="text-muted-foreground text-sm">
                  Add specific time limits to your requests to receive
                  notifications if an endpoint takes longer than expected.
                </p>
              </div>
              <div className="mt-2 grid gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Degraded (in ms.)</Label>
                  <Input disabled type="number" placeholder="coming soon" />
                  <p className="text-muted-foreground text-sm">
                    Time after which the endpoint is considered degraded.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Timeout (in ms.)</Label>
                  <Input
                    type="number"
                    placeholder="30000"
                    {...register("timeout", {
                      max: {
                        value: 10000000,
                        message:
                          "timeout must be less than 10000000 characters",
                      },
                    })}
                  />
                  <p className="text-muted-foreground text-sm">
                    Max. time allowed for request to complete.
                  </p>
                  {errors.timeout && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.timeout?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={3}>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <h4 className="font-medium text-foreground">Notifications</h4>
                <p className="text-muted-foreground text-sm">
                  Select the notification channels you want to be informed.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {notificationChannelsDemo.map((notifi) => {
                    const selected = (
                      getValues("notificationChannel") || []
                    ).includes(notifi.id);

                    return (
                      <Button
                        key={notifi.id}
                        variant={selected ? "default" : "outline"}
                        onClick={() => toggleChannel(notifi.id)}
                        className="text-sm"
                      >
                        {notifi.name}
                        <Badge variant={"secondary"}>{notifi.channel}</Badge>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={4}>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <div>
                  <h4 className="font-medium text-foreground">Status Page</h4>
                  <p className="text-muted-foreground text-sm">
                    Select the pages where you want to display the monitor.
                  </p>
                </div>
                <div className="flex flex-col gap-2 col-span-2">
                  <Label htmlFor="method">Method</Label>
                  {/* Start from here */}
                  <Controller
                    name="monitor"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="GET">GET</SelectItem>
                            <SelectItem disabled value="POST">
                              POST (Coming Soon)
                            </SelectItem>
                            <SelectItem disabled value="PUT">
                              PUT (Coming Soon)
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={5}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <div>
                  <h4 className="font-medium text-foreground">Danger Zone</h4>
                  <p className="text-muted-foreground text-sm">
                    Be aware of the changes you are about to make.
                  </p>
                </div>
                <div className="flex items-center justify-start gap-5 mt-5">
                  <Button className="bg-red-500 hover:bg-red-400">
                    Delete
                  </Button>
                  <p className="text-red-500">
                    This action cannot be undone. This will permanently delete
                    the monitor.
                  </p>
                </div>
              </div>
            </div>
          </CustomTabPanel>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default CreateMonitor;
