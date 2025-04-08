import {
  MRT_GlobalFilterTextField,
  MRT_TableBodyCellValue,
  MRT_TablePagination,
  flexRender,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { type Person, data, regions } from "@/lib/utils";
import { useTheme } from "@/provider/theme-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Check,
  CircleCheck,
  Radio,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
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
import React from "react";
import { CustomTabPanel } from "../custom-panel";
const columns: MRT_ColumnDef<Person>[] = [
  {
    accessorKey: "name.firstName",
    header: "Name",
    Header: () => (
      <div className="flex items-center gap-5">
        <Radio className="w-5 h-5 " />
        Name
      </div>
    ),
    Cell: ({ row }) => (
      <div className="flex items-center gap-5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75 duration-1000"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        </span>
        <Link
          to={`/dashboard/moniters/details/overview`}
          className="hover:underline"
        >
          {row.original.name.firstName}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "name.lastName",
    header: "Last 7 days",
  },
  {
    accessorKey: "address",
    header: "Last ping",
  },
  {
    accessorKey: "city",
    header: "Uptime",
  },
  {
    accessorKey: "state",
    header: "P50",
  },
  {
    accessorKey: "state",
    header: "P75",
  },
  {
    accessorKey: "state",
    header: "P95",
  },
  {
    accessorKey: "state",
    header: "P99",
  },
];

const MoniterTable = () => {
  const userTheme = useTheme();
  const table = useMaterialReactTable({
    columns,
    data,
    enableSorting: true, // Enable sorting globally
    enableColumnFilters: true, // Enable column filtering
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
      showGlobalFilter: true,
      showColumnFilters: true,
    },
    //customize the MRT components
    muiPaginationProps: {
      rowsPerPageOptions: [5, 10, 15],
      variant: "outlined",
    },
    paginationDisplayMode: "pages",
  });
  const [value, setValue] = React.useState(0);
  const [selectedRegions, setSelectedRegions] = React.useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = React.useState<string[]>([]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: userTheme.theme === "light" ? "light" : "dark",
        },
      })}
    >
      <div className="rounded-xl border border-border bg-background/70 px-3 py-4 backdrop-blur-lg">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between py-1">
            <div className="">
              <Typography variant="h4">Moniters</Typography>
              <Typography variant="body1">
                Overview of all your monitors.
              </Typography>
            </div>
            <Drawer>
              <DrawerTrigger>
                <Button className="cursor-pointer">Create</Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="flex-1 overflow-y-auto p-2 mt-2">
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="flex flex-col gap-1">
                      <h4 className="font-medium text-foreground">
                        Basic Information
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Be able to find your monitor easily.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-full space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" placeholder="name" />
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
                        value={value}
                        onChange={handleChange}
                        textColor="inherit"
                        variant="scrollable"
                      >
                        <Tab className="!normal-case" label="Requests" />
                        <Tab
                          className="!normal-case"
                          label="Schedule & Regions"
                        />
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
                                Update your{" "}
                                <span className="underline">HTTP</span> request.
                                Add custom headers, payload and test your
                                endpoint before submitting.
                              </p>
                            </div>
                          </div>
                          <div className="grid gap-4 sm:grid-cols-7 grid-cols-1">
                            <div className="flex flex-col gap-2 col-span-2">
                              <Label htmlFor="method">Method</Label>
                              <Select defaultValue={"GET"}>
                                <SelectTrigger className="w-full">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="GET">GET</SelectItem>
                                    <SelectItem disabled value="POST">
                                      POST
                                    </SelectItem>
                                    <SelectItem disabled value="PUT">
                                      PUT
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex flex-col gap-2 col-span-5">
                              <Label htmlFor="url">URL</Label>
                              <Input type="text" id="url" placeholder="URL" />
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
                                      handleChangeInput(
                                        index,
                                        "key",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="flex flex-col gap-1 flex-1">
                                  <Input
                                    type="text"
                                    placeholder="value"
                                    value={header.value}
                                    onChange={(e) =>
                                      handleChangeInput(
                                        index,
                                        "value",
                                        e.target.value
                                      )
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
                      <CustomTabPanel value={value} index={1}>
                        <div className="flex flex-col gap-5">
                          <div className="flex flex-col gap-1">
                            <h4 className="font-medium text-foreground">
                              Schedule and Regions
                            </h4>
                            <p className="text-muted-foreground text-sm">
                              Customize the period of time and the regions where
                              your endpoint will be monitored.
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
                                    <SelectItem value="10m">
                                      10 minutes
                                    </SelectItem>
                                    <SelectItem value="30m">
                                      20 minutes
                                    </SelectItem>
                                    <SelectItem value="1hr">1 hour</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                            <p className="text-muted-foreground text-sm">
                              Frequency of how often your endpoint will be
                              pinged.
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
                                  <div
                                    key={region.name}
                                    className="flex flex-col gap-3"
                                  >
                                    <h5 className="text-sm">{region.name}</h5>
                                    <div className="grid grid-cols-3 gap-2 ">
                                      {region.subRegions.map((sub) => (
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
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <p className="text-muted-foreground text-sm mt-2">
                                Select the regions you want to monitor your
                                endpoint from. <br />
                                <span className="text-xs">
                                  Only a few regions are available in the free
                                  plan. Upgrade to access all regions.
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </CustomTabPanel>
                      <CustomTabPanel value={value} index={2}>
                        <div className="flex flex-col gap-5">
                          <div className="flex flex-col gap-1">
                            <h4 className="font-medium text-foreground">
                              Timing Setting
                            </h4>
                            <p className="text-muted-foreground text-sm">
                              Add specific time limits to your requests to
                              receive notifications if an endpoint takes longer
                              than expected.
                            </p>
                          </div>
                          <div className="mt-2 grid gap-4">
                            <div className="flex flex-col gap-2">
                              <Label>Degraded (in ms.)</Label>
                              <Input
                                disabled
                                type="number"
                                placeholder="30000"
                              />
                              <p className="text-muted-foreground text-sm">
                                Time after which the endpoint is considered
                                degraded.
                              </p>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Label>Timeout (in ms.)</Label>
                              <Input
                                value={45000}
                                type="number"
                                placeholder="30000"
                              />
                              <p className="text-muted-foreground text-sm">
                                Max. time allowed for request to complete.
                              </p>
                            </div>
                          </div>
                        </div>
                      </CustomTabPanel>
                      <CustomTabPanel value={value} index={3}>
                        <div className="flex flex-col gap-5">
                          <div className="flex flex-col gap-1">
                            <h4 className="font-medium text-foreground">
                              Notifications
                            </h4>
                            <p className="text-muted-foreground text-sm">
                              Select the notification channels you want to be
                              informed.
                            </p>
                            <div className="grid grid-cols-3 gap-2 ">
                              {["email", "discord", "slack"].map(
                                (notifi, idx) => (
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
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </CustomTabPanel>
                      <CustomTabPanel value={value} index={4}>
                        <div className="flex flex-col gap-5">
                          <div className="flex flex-col gap-1">
                            <div>
                              <h4 className="font-medium text-foreground">
                                Status Page
                              </h4>
                              <p className="text-muted-foreground text-sm">
                                Select the pages where you want to display the
                                monitor.
                              </p>
                            </div>
                            <div className="grid grid-cols-3 gap-2 ">
                              {["email", "discord", "slack"].map(
                                (notifi, idx) => (
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
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </CustomTabPanel>
                      <CustomTabPanel value={value} index={5}>
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
                              <Button className="bg-red-500 hover:bg-red-400">
                                Delete
                              </Button>
                              <p className="text-red-500">
                                This action cannot be undone. This will
                                permanently delete the monitor.
                              </p>
                            </div>
                          </div>
                        </div>
                      </CustomTabPanel>
                    </ThemeProvider>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          <div className="flex justify-end">
            <MRT_GlobalFilterTextField
              size="small"
              placeholder="search...."
              table={table}
            />
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell align="left" variant="head" key={header.id}>
                        {header.isPlaceholder ? null : (
                          <div className="flex items-center gap-2">
                            {/* Column Name */}
                            {flexRender(
                              header.column.columnDef.Header ??
                                header.column.columnDef.header,
                              header.getContext()
                            )}

                            {/* Sorting Dropdown Menu */}
                            {header.column.getCanSort() && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    {header.column.getIsSorted() === "asc" ? (
                                      <ArrowUp className="w-4 h-4" />
                                    ) : header.column.getIsSorted() ===
                                      "desc" ? (
                                      <ArrowDown className="w-4 h-4" />
                                    ) : (
                                      <ArrowUpDown className="w-4 h-4" />
                                    )}
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                  <DropdownMenuItem
                                    onClick={() => header.column.clearSorting()}
                                  >
                                    <ArrowUpDown className="w-4 h-4 mr-2" />
                                    Default
                                    {!header.column.getIsSorted() && (
                                      <Check className="w-4 h-4 ml-auto" />
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      header.column.toggleSorting(false)
                                    }
                                  >
                                    <ArrowUp className="w-4 h-4 mr-2" /> Sort
                                    Ascending
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      header.column.toggleSorting(true)
                                    }
                                  >
                                    <ArrowDown className="w-4 h-4 mr-2" /> Sort
                                    Descending
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>

              <TableBody>
                {table.getRowModel().rows.map((row, rowIndex) => (
                  <TableRow key={row.id} selected={row.getIsSelected()}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell align="left" variant="body" key={cell.id}>
                        {/* Use MRT's cell renderer that provides better logic than flexRender */}
                        <MRT_TableBodyCellValue
                          cell={cell}
                          table={table}
                          staticRowIndex={rowIndex}

                          //just for batch row selection to work
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="flex justify-end">
            <MRT_TablePagination table={table} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MoniterTable;
