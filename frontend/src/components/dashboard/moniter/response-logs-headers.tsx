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

type Props = {
  data: { key: string; value: string }[];
};

const ResponseLogsHeaders = ({ data }: Props) => {
  const userTheme = useTheme();
  const columns = useMemo<MRT_ColumnDef<{ key: string; value: string }>[]>(
    () => [
      {
        accessorKey: "key",
        header: "Key",
      },
      {
        accessorKey: "value",
        header: "Value",
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data,
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

export default ResponseLogsHeaders;

// %
// SELECT
//     (
//         SELECT
//             arrayMap(
//                 x -> CAST(
//                     (
//                         [
//                             'date',
//                             'statusCode',
//                             'latency',
//                             'Region',
//                             'Headers',
//                             'Dns',
//                             'Tls',
//                             'Transfer',
//                             'Ttfb',
//                             'Tcp'
//                         ],
//                         [
//                             toString(x .1),
//                             toString(x .2),
//                             toString(x .3),
//                             toString(x .4),
//                             toJSONString(
//                                 arrayMap(
//                                     p -> CAST(
//                                         (['key', 'value'], [p .1, p .2]), 'Map(String, String)'
//                                     ),
//                                     arrayZip(x .5, x .6)
//                                 )
//                             ),

//                             toString(x .7),
//                             toString(x .8),
//                             toString(x .9),
//                             toString(x .10),
//                             toString(x .11)
//                         ]
//                     ),
//                     'Map(String, String)'
//                 ),
//                 groupArray(
//                     (
//                         timestamp,
//                         statusCode,
//                         durationMs,
//                         Region,
//                         headers__key,
//                         headers__value,
//                         dns,
//                         tls,
//                         transfer,
//                         ttfb,
//                         tcp
//                     )
//                 )
//             )
//         FROM paginated_logs
//     ) AS logs,

//     (SELECT total FROM total_count) AS total,

//     {{ Int32(offset, 0, required=True) }} AS offset,

//     intDiv({{ Int32(offset, 0) }}, {{ Int32(limit, 10) }}) + 1 AS page
