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
import { type Person, data } from "@/lib/utils";
import { useTheme } from "@/provider/theme-provider";
import { Button } from "@/components/ui/button";

type RowType = { [key: string]: any };
const columns: MRT_ColumnDef<Person>[] = [
  {
    accessorKey: "name.firstName",
    header: "Name",
  },
  {
    accessorKey: "name.lastName",
    header: "Provider",
  },
  {
    accessorKey: "address",
    header: "Monitor",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    Cell: ({ row }) => (
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => handleEdit(row)}>
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleDelete(row)}
        >
          Delete
        </Button>
      </div>
    ),
  },
];

const handleEdit = (row: RowType) => {
  console.log("Edit", row);
};

const handleDelete = (row: RowType) => {
  console.log("Delete", row);
};

const NotificationTable = () => {
  const userTheme = useTheme();
  const table = useMaterialReactTable({
    columns,
    data,
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
      </div>
    </ThemeProvider>
  );
};

export default NotificationTable;
