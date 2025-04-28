import {
  MRT_TableBodyCellValue,
  MRT_TablePagination,
  flexRender,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
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
import React, { useState } from "react";
import { useResponseLogs } from "@/hooks/useResponseLogs";
import { logs } from "@/lib/types";
import { useParams } from "react-router-dom";
import Loader from "@/components/ui/loader";
import ErrorComponent from "@/components/ui/error";
import { CustomTabPanel } from "../custom-panel";
import ResponseLogsHeaders from "./response-logs-headers";
import ResponseLogsTimings from "./response-logs-timings";

const columns: MRT_ColumnDef<logs>[] = [
  {
    accessorKey: "date",
    header: "Date",
    Cell: ({ cell }) => <>{new Date(cell.getValue<any>()).toLocaleString()}</>,
  },
  {
    accessorKey: "statusCode",
    header: "Status",
    Cell: ({ cell }) => (
      <div className="inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-mono border-green-500/20 bg-green-500/10 text-green-800 dark:text-green-300">
        <code>{cell.getValue<any>()}</code>
      </div>
    ),
  },
  {
    accessorKey: "latency",
    header: "Latency(ms)",
    Cell: ({ cell }) => <>{parseInt(cell.getValue<any>()).toFixed()} ms</>,
  },
  {
    accessorKey: "Region",
    header: "Region",
    Cell: ({ cell }) => <>{cell.getValue<string>().replace(/A/g, " A")}</>,
  },
];

const ResponseLogs = () => {
  const userTheme = useTheme();
  const { id } = useParams();
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [tabValue, setTabValue] = React.useState(0);
  const { data, isLoading, isError, isSuccess } = useResponseLogs(
    id!,
    pagination.pageIndex + 1,
    pagination.pageSize
  );
  const table = useMaterialReactTable({
    columns,
    data: isSuccess ? data.logs : [],
    state: { pagination, isLoading: isLoading },
    manualPagination: true,
    rowCount: data?.total ?? 0,
    onPaginationChange: setPagination,
    enableSorting: true,
    enableColumnFilters: true,
    initialState: {
      showGlobalFilter: true,
      showColumnFilters: true,
    },
    muiPaginationProps: {
      rowsPerPageOptions: [5, 10],
      variant: "outlined",
    },
    paginationDisplayMode: "pages",
    enableExpanding: true,
    enableExpandAll: false,
    renderDetailPanel: () => true,
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
        {isLoading && (
          <div className="flex h-screen justify-center items-center">
            <Loader />
          </div>
        )}

        {isError && (
          <div className="flex h-screen justify-center items-center">
            <ErrorComponent />
          </div>
        )}

        {isSuccess && (
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
                              {flexRender(
                                header.column.columnDef.Header ??
                                  header.column.columnDef.header,
                                header.getContext()
                              )}
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
                                      <ArrowUp className="w-4 h-4 mr-2" /> Sort
                                      Ascending
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
                    <React.Fragment key={row.id}>
                      <TableRow selected={row.getIsSelected()}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell align="left" variant="body" key={cell.id}>
                            <MRT_TableBodyCellValue
                              cell={cell}
                              table={table}
                              staticRowIndex={rowIndex}
                            />
                          </TableCell>
                        ))}
                      </TableRow>

                      {/* Expanded content row */}
                      {row.getIsExpanded() && (
                        <TableRow>
                          <TableCell colSpan={columns.length + 1}>
                            <Tabs
                              value={tabValue}
                              onChange={(_event: any, value: number) =>
                                setTabValue(value)
                              }
                              textColor="inherit"
                              variant="scrollable"
                            >
                              <Tab className={`!normal-case`} label="Headers" />
                              <Tab className={`!normal-case`} label="Timing" />
                            </Tabs>
                            <CustomTabPanel value={tabValue} index={0}>
                              <ResponseLogsHeaders
                                data={JSON.parse(row.original.Headers)}
                              />
                            </CustomTabPanel>
                            <CustomTabPanel value={tabValue} index={1}>
                              <ResponseLogsTimings
                                data={JSON.parse(row.original.Timings)}
                              />
                            </CustomTabPanel>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <div className="flex justify-end">
              <MRT_TablePagination table={table} />
            </div>
          </div>
        )}
      </ThemeProvider>
    </div>
  );
};

export default ResponseLogs;
