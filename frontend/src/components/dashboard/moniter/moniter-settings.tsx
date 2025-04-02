import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
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
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const MoniterSettings = () => {
  const userTheme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
        <div className="flex  gap-2">
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
      <div>
        <ThemeProvider
          theme={createTheme({
            palette: {
              mode: userTheme.theme === "light" ? "light" : "dark",
            },
          })}
        >
          <Tabs
            value={value}
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
          <CustomTabPanel value={value} index={0}>
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
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            Item Four
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            Item Five
          </CustomTabPanel>
          <CustomTabPanel value={value} index={5}>
            Item Six
          </CustomTabPanel>
          <CustomTabPanel value={value} index={6}>
            Item Seven
          </CustomTabPanel>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default MoniterSettings;
