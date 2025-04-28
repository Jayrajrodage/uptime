import {
  MRT_TableBodyCellValue,
  flexRender,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { ThemeProvider, Typography, createTheme } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { type StatusPage } from "@/lib/types";
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
  ArrowUpRight,
  Check,
} from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import CreateStatusPage from "./create-status-page";
import { Badge } from "@/components/ui/badge";
const columns: MRT_ColumnDef<StatusPage>[] = [
  {
    accessorKey: "title",
    header: "Title",
    Cell: ({ row }) => (
      <Link
        to={`/dashboard/status-pages/details/${row.original.id}`}
        className="hover:underline"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "slug",
    header: "Slug",
    Cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-flex items-center gap-1 hover:underline cursor-pointer">
              <a href={`https://${row.original.slug}`} target="_blank">
                {row.original.slug}
              </a>
              <ArrowUpRight />
            </span>
          </TooltipTrigger>

          <TooltipContent>
            <p>Visit page</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "monitor",
    header: "Monitors",
    Cell: ({ row }) => (
      <div>
        <Badge variant={"secondary"}>{row.original.monitors?.name}</Badge>
      </div>
    ),
  },
];
interface props {
  Pages: StatusPage[];
}
const StatusTable = ({ Pages }: props) => {
  const userTheme = useTheme();
  const table = useMaterialReactTable({
    columns,
    data: Pages,
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
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between py-1">
          <div>
            <Typography variant="h4">Status Page</Typography>
            <Typography variant="body1">Overview of all your pages.</Typography>
          </div>
          <Drawer>
            <DrawerTrigger>
              <Button variant={"default"}>Create</Button>
            </DrawerTrigger>
            <DrawerContent>
              <CreateStatusPage />
            </DrawerContent>
          </Drawer>
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
                                  ) : header.column.getIsSorted() === "desc" ? (
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
      </div>
    </ThemeProvider>
  );
};

export default StatusTable;
