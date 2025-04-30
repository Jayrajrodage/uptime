import {
  MRT_TableBodyCellValue,
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
import { useTheme } from "@/provider/theme-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, ArrowUp, ArrowUpDown, Check } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import { MoniterTableStats } from "@/lib/types";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { timestamp, durationMs } = payload[0].payload; // Extract data of hovered point
    return (
      <div className="rounded-xl border border-border bg-background/70 px-3 py-4 backdrop-blur-lg">
        <p className="label">{new Date(timestamp).toLocaleString()}</p>
        <div className="flex gap-2">
          <div className="bg-green-400 w-1" />
          <p className="intro">
            {`Latency: ${parseInt(durationMs).toFixed()}`} Ms
          </p>
        </div>
      </div>
    );
  }
};
const columns: MRT_ColumnDef<MoniterTableStats>[] = [
  {
    accessorKey: "Region",
    header: "Region",
  },
  {
    accessorKey: "Trend",
    header: "Trend",
    Cell: ({ cell }) => {
      const rawData = cell.getValue(); // Ensure the data is retrieved correctly

      if (!Array.isArray(rawData)) return "No Data"; // Handle missing data
      const trendData = rawData.map((d) => ({
        ...d,
        durationMs: parseFloat(d.durationMs), // Convert string to number
      }));
      return (
        <ResponsiveContainer width={"100%"} height={70}>
          <LineChart data={trendData}>
            <Line
              type="monotone"
              dataKey="durationMs"
              stroke="#49fa46"
              strokeWidth={2}
              dot={false}
              animationEasing="ease-in-out"
            />
            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      );
    },
  },
  {
    accessorKey: "P50",
    header: "P50",
  },
  {
    accessorKey: "P95",
    header: "P95",
  },
  {
    accessorKey: "P90",
    header: "P90",
  },
];
interface props {
  data: MoniterTableStats[];
}

const MoniterStatsTable = ({ data }: props) => {
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
    <div>
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

                            {["Region", "Trend"].includes(
                              header.column.columnDef.header as string
                            )
                              ? null
                              : header.column.getCanSort() && (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        {header.column.getIsSorted() ===
                                        "asc" ? (
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
                                        onClick={() =>
                                          header.column.clearSorting()
                                        }
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
                                        <ArrowUp className="w-4 h-4 mr-2" />{" "}
                                        Sort Ascending
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          header.column.toggleSorting(true)
                                        }
                                      >
                                        <ArrowDown className="w-4 h-4 mr-2" />{" "}
                                        Sort Descending
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
                      <TableCell
                        align="left"
                        variant="body"
                        style={
                          cell.column.id === "Trend" ? { minWidth: 300 } : {}
                        }
                        key={cell.id}
                      >
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
    </div>
  );
};

export default MoniterStatsTable;
