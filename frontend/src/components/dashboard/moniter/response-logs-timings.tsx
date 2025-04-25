import { useMemo } from "react";
import {
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_TableBodyCellValue, flexRender } from "material-react-table";
import {
  createTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
} from "@mui/material";

import { useTheme } from "@/provider/theme-provider";
import { timing } from "@/lib/types";

type Props = {
  data: timing;
};

const ResponseLogsTimings = ({ data }: Props) => {
  const result = Object.entries(data).map(([key, value]) => ({
    timing: key,
    duration: value,
  }));
  const userTheme = useTheme();
  const columns = useMemo<
    MRT_ColumnDef<{ timing: string; duration: string }>[]
  >(
    () => [
      {
        accessorKey: "timing",
        header: "Timing",
      },
      {
        accessorKey: "duration",
        header: "Duration",
        Cell: ({ cell }) => <div>{cell.getValue<string>()} ms</div>,
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data: result,
    paginationDisplayMode: "pages",
    enablePagination: false,
  });

  return (
    <div className="flex flex-col gap-2 mt-2">
      <ThemeProvider
        theme={createTheme({
          palette: {
            mode: userTheme.theme === "light" ? "light" : "dark",
          },
        })}
      ></ThemeProvider>
      <TableContainer>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell align="center" variant="head" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.Header ??
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
                {row.getVisibleCells().map((cell, _columnIndex) => (
                  <TableCell align="center" variant="body" key={cell.id}>
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
  );
};

export default ResponseLogsTimings;
