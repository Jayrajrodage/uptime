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
import { useTheme } from "@/provider/theme-provider";
import { Badge } from "@/components/ui/badge";
import DeleteChannel from "./delete-channel";
import { Channel, notificationTableProps } from "@/lib/types";

const columns: MRT_ColumnDef<Channel>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "channel",
    header: "Provider",
    Cell: ({ row }) => (
      <div>
        <Badge variant={"secondary"}>{row.original.channel}</Badge>
      </div>
    ),
  },
  {
    accessorKey: "monitors",
    header: "Monitor",
    Cell: ({ row }) => (
      <>
        {row.original.monitors.map((monitor) => (
          <Badge variant={"secondary"}>{monitor.name}</Badge>
        ))}
      </>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    Cell: ({ row }) => <DeleteChannel row={row} />,
  },
];

const NotificationTable = ({ channelData }: notificationTableProps) => {
  const userTheme = useTheme();
  const table = useMaterialReactTable({
    columns,
    data: channelData,
    enableSorting: false, // Disable sorting globally
    enableColumnFilters: false, // Disable column filtering
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
      showGlobalFilter: false,
      showColumnFilters: false,
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
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between py-1">
          <div>
            <Typography variant="h4"> Notifications</Typography>
            <Typography variant="body1">
              Overview of all your notification channels.
            </Typography>
          </div>
        </div>
        {channelData.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell align="left" variant="head" key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
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
                        <MRT_TableBodyCellValue
                          cell={cell}
                          table={table}
                          staticRowIndex={rowIndex}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <h1 className="text-center">zero notification channels found</h1>
        )}
      </div>
      <div className="w-full border-t border-gray-300 mt-6"></div>
    </ThemeProvider>
  );
};

export default NotificationTable;
