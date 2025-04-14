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
import { type Person, data } from "@/lib/utils";
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
          to={`/dashboard/moniters/details/overview/1`}
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
