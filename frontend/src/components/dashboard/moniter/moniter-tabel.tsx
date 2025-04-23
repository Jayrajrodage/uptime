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
import { useTheme } from "@/provider/theme-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, ArrowUp, ArrowUpDown, Check, Radio } from "lucide-react";
import { Link } from "react-router-dom";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import CreateMonitor from "./create-monitor";
import { monitor, MonitorQueryResult } from "@/lib/types";

const columns: MRT_ColumnDef<monitor>[] = [
  {
    accessorKey: "name",
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
          to={`/dashboard/moniters/details/overview/${row.original.id}`}
          className="hover:underline"
        >
          {row.original.name}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "method",
    header: "Method",
  },
  {
    accessorKey: "frequency",
    header: "Frequency",
    Cell: ({ row }) => (
      <>{row.original.frequency === "ThirtyMin" ? "30 min" : "1 Hr"}</>
    ),
  },
  {
    accessorKey: "subRegions",
    header: "Sub Regions",
    Cell: ({ row }) => <>{row.original.subRegions.length ?? 0}</>,
  },
  {
    accessorKey: "notificationChannel",
    header: "Notification Channels",
    Cell: ({ row }) => <>{row.original.notificationChannel.length ?? 0}</>,
  },
  {
    accessorKey: "StatusPages",
    header: "Status Page",
    Cell: ({ row }) => <>{row.original.StatusPages?.title}</>,
  },
  {
    accessorKey: "isActive",
    header: "Active",
    Cell: ({ row }) => <>{row.original.isActive ? "Yes" : "No"}</>,
  },
];
type props = {
  data: MonitorQueryResult;
  pagination: { pageIndex: number; pageSize: number };
  setPagination: React.Dispatch<
    React.SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
};
const MoniterTable = ({ data, pagination, setPagination }: props) => {
  const userTheme = useTheme();
  const table = useMaterialReactTable({
    columns,
    data: data.Monitors ?? [],
    state: { pagination },
    manualPagination: true,
    rowCount: data?.pagination.total ?? 0,
    onPaginationChange: setPagination,
    enableSorting: true,
    enableColumnFilters: true,
    initialState: {
      showGlobalFilter: true,
      showColumnFilters: true,
    },
    muiPaginationProps: {
      rowsPerPageOptions: [5, 10, 15],
      variant: "outlined",
    },
    paginationDisplayMode: "pages",
  });

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
                <CreateMonitor />
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
