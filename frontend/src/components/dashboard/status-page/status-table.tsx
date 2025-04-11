import {
  MRT_TableBodyCellValue,
  MRT_TablePagination,
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
import { type StatusPage } from "@/lib/utils";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
const columns: MRT_ColumnDef<StatusPage>[] = [
  {
    accessorKey: "title",
    header: "Title",
    Cell: ({ row }) => (
      <Link
        to={`/dashboard/status-page/details/${row.original.id}`}
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
            <h1 className="hover:underline">{row.original.slug}</h1>
            <ArrowUpRight />
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
              <div className="flex flex-col gap-7 p-5">
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-5">
                  <div className="flex flex-col gap-1 col-span-1">
                    <h4 className="font-medium text-foreground">
                      Basic information
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      The public status page to update your users on service
                      uptime.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 col-span-2">
                    <div className="flex flex-col gap-2 col-span-5">
                      <Label htmlFor="Title">Title</Label>
                      <Input type="text" id="Title" placeholder="Title" />
                      <p className="text-muted-foreground">
                        The title of your page.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 col-span-5">
                      <Label htmlFor="Slug">Slug</Label>
                      <div className="flex">
                        <Input type="text" id="Slug" placeholder="Slug" />
                        <div className="dark:bg-gray-500 bg-gray-400 w-[10rem] flex justify-center items-center rounded-tr-lg rounded-ee-lg">
                          .uptime.dev
                        </div>
                      </div>
                      <p className="text-muted-foreground">
                        The subdomain for your status page. At least 3 chars.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 col-span-2">
                      <Label htmlFor="email">Select moniters </Label>
                      <Select defaultValue={"Lingo"}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Lingo">Lingo</SelectItem>
                            <SelectItem value="Lingoq">Lingow</SelectItem>
                            <SelectItem value="Lingoaad">Lingoaad</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end py-2">
                      <Button className="w-[10rem] h-10">Confirm</Button>
                    </div>
                  </div>
                </div>
              </div>
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
