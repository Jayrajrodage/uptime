import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { CustomTabPanel } from "../custom-panel";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, Tab } from "@mui/material";
import DashboardLayout from "../layout";

const StatusPageDetails = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  //start from here- status page details
  return (
    <DashboardLayout>
      <div className="rounded-xl border border-border p-2 bg-background/70 px-3 py-4 backdrop-blur-lg md:col-span-2 flex flex-col gap-7">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Name</h1>
          <Button variant={"ghost"}>visit</Button>
        </div>
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-5">
          <div className="flex flex-col gap-1 col-span-1">
            <h4 className="font-medium text-foreground">Basic information</h4>
            <p className="text-muted-foreground text-sm">
              The public status page to update your users on service uptime.
            </p>
          </div>
          <div className="flex flex-col gap-3 col-span-2">
            <div className="flex flex-col gap-2 col-span-5">
              <Label htmlFor="Title">Title</Label>
              <Input type="text" id="Title" placeholder="Title" />
              <p className="text-muted-foreground">The title of your page.</p>
            </div>
            <div className="flex flex-col gap-2 col-span-5">
              <Label htmlFor="Slug">Slug</Label>
              <div className="flex">
                <Input type="text" id="Slug" placeholder="Slug" />
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
            value={value}
            onChange={handleChange}
            textColor="inherit"
            variant="scrollable"
          >
            <Tab className="!normal-case" label="Moniters" />
            <Tab className="!normal-case" label="Dangers" />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <div className="flex flex-col gap-5">
              <div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-medium text-foreground">
                    Connected Monitors
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Select the monitors you want to display on your status page.
                    Change the order by using the right-side handle. Inactive
                    monitors will not be shown.
                  </p>
                </div>
              </div>
              <div className="max-w-1/4">
                <div className="flex flex-col gap-2 col-span-2">
                  <Label htmlFor="email">Select moniters </Label>
                  <Select defaultValue={"Lingo"}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Lingo">Lingo</SelectItem>
                        <SelectItem value="Lingoq">Lingow</SelectItem>
                        <SelectItem value="Lingoaad">Lingoaad</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
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
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StatusPageDetails;
