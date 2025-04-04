import {
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
import { ArrowDown, ArrowUp, ArrowUpDown, Check } from "lucide-react";

const columns: MRT_ColumnDef<Person>[] = [
  {
    accessorKey: "name.firstName",
    header: "Date",
  },
  {
    accessorKey: "name.lastName",
    header: "Status",
    Cell: ({ cell }) => (
      <div className="inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-mono border-green-500/20 bg-green-500/10 text-green-800 dark:text-green-300">
        <code>{cell.getValue<any>()}</code>
      </div>
    ),
  },
  {
    accessorKey: "address",
    header: "Latency(ms)",
  },
  {
    accessorKey: "city",
    header: "Region",
  },
];

const ResponseLogs = () => {
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
    <div className="flex flex-col gap-2 mt-2">
      <ThemeProvider
        theme={createTheme({
          palette: {
            mode: userTheme.theme === "light" ? "light" : "dark",
          },
        })}
      >
        <div className="flex flex-col gap-5">
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
      </ThemeProvider>
    </div>
  );
};

export default ResponseLogs;
