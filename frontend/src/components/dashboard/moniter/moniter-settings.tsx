import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { createTheme, ThemeProvider } from "@mui/material";
import { useTheme } from "@/provider/theme-provider";
import {
  SelectContent,
  SelectGroup,
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { regions } from "@/lib/utils";
import { CustomTabPanel } from "../custom-panel";
import { CreateMonitorInput } from "@/lib/types";
import { useForm } from "react-hook-form";

const MoniterSettings = () => {
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
  const userTheme = useTheme();
  const [tabValue, setTabValue] = React.useState(0);
  const [selectedRegions, setSelectedRegions] = React.useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = React.useState<string[]>([]);
  const [headers, setHeaders] = React.useState([{ key: "", value: "" }]);

  const handleAddField = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const handleRemoveField = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const handleChangeInput = (index: number, field: string, value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field as "key" | "value"] = value;
    setHeaders(newHeaders);
  };

  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };
  const toggleChannels = (channel: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((r) => r !== channel)
        : [...prev, channel]
    );
  };
  return (
    <div className="py-5">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="flex flex-col gap-1">
          <h4 className="font-medium text-foreground">Basic Information</h4>
          <p className="text-muted-foreground text-sm">
            Be able to find your monitor easily.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="w-full space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div className="mt-5 flex flex-row items-center justify-center space-x-1 space-y-0">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Active
            </label>
            <Switch />
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
                  <Label htmlFor="email">Email</Label>
                  <Select defaultValue={"GET"}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2 col-span-5">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" placeholder="Email" />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Request Header</Label>
                {headers.map((header, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex flex-col gap-1 flex-1">
                      <Input
                        type="text"
                        placeholder="key"
                        value={header.key}
                        onChange={(e) =>
                          handleChangeInput(index, "key", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <Input
                        type="text"
                        placeholder="value"
                        value={header.value}
                        onChange={(e) =>
                          handleChangeInput(index, "value", e.target.value)
                        }
                      />
                    </div>

                    {headers.length > 1 && (
                      <Button
                        variant="destructive"
                        onClick={() => handleRemoveField(index)}
                      >
                        -
                      </Button>
                    )}
                  </div>
                ))}

                <Button variant="outline" onClick={handleAddField}>
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
                  <Select defaultValue={"10m"}>
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
                </div>
                <p className="text-muted-foreground text-sm">
                  Frequency of how often your endpoint will be pinged.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <h1 className="font-medium">Region</h1>
                    <Button
                      variant="destructive"
                      onClick={() => setSelectedRegions([])}
                    >
                      Clear
                    </Button>
                  </div>
                  <div className="grid gap-5">
                    {regions.map((region) => (
                      <div key={region.name} className="flex flex-col gap-3">
                        <h5 className="text-sm">{region.name}</h5>
                        <div className="grid grid-cols-3 gap-2 ">
                          {/* {region.subRegions.map((sub) => (
                            <Button
                              key={sub}
                              variant={
                                selectedRegions.includes(sub)
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() => toggleRegion(sub)}
                              className="text-sm"
                            >
                              {sub}
                              {selectedRegions.includes(sub) ? (
                                <CircleCheck />
                              ) : null}
                            </Button>
                          ))} */}
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
                  <Input type="number" placeholder="30000" />
                  <p className="text-muted-foreground text-sm">
                    Time after which the endpoint is considered degraded.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Timeout (in ms.)</Label>
                  <Input type="number" placeholder="30000" />
                  <p className="text-muted-foreground text-sm">
                    Max. time allowed for request to complete.
                  </p>
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
                <div className="grid grid-cols-3 gap-2 ">
                  {["email", "discord", "slack"].map((notifi, idx) => (
                    <Button
                      key={idx}
                      variant={
                        selectedChannels.includes(notifi)
                          ? "default"
                          : "outline"
                      }
                      onClick={() => toggleChannels(notifi)}
                      className="text-sm"
                    >
                      {notifi}
                    </Button>
                  ))}
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
                <div className="grid grid-cols-3 gap-2 ">
                  {["email", "discord", "slack"].map((notifi, idx) => (
                    <Button
                      key={idx}
                      variant={
                        selectedChannels.includes(notifi)
                          ? "default"
                          : "outline"
                      }
                      onClick={() => toggleChannels(notifi)}
                      className="text-sm"
                    >
                      {notifi}
                    </Button>
                  ))}
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

export default MoniterSettings;
