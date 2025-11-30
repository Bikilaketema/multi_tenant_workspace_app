"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  GripVertical,
  MoreHorizontal,
  Plus,
  Settings2,
  CheckCircle,
  Loader2,
  Clock
} from "lucide-react"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SectionSheet } from "@/components/section-sheet"
import { useOutlines, useCreateOutline, useDeleteOutline, useEditOutline } from "@/hooks/useOutlines"
import { useParams } from "next/navigation"
import { Outline } from "@/lib/types/types"
import { toast } from "sonner"
import { reorder } from "@/lib/utils"


export function DataTable() {
  const { org_id } = useParams() as { org_id: string };
  const { data: outlines = [], isLoading, refetch } = useOutlines(org_id);
  const createOutline = useCreateOutline(org_id);
  const deleteOutline = useDeleteOutline(org_id);
  const editOutline = useEditOutline(org_id);

  const [localOutlines, setLocalOutlines] = React.useState<Outline[]>([]);

  React.useEffect(() => {
    if (outlines) {
      setLocalOutlines(outlines);
    }
  }, [outlines]);

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [activeTab, setActiveTab] = React.useState("outline")

  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [sheetMode, setSheetMode] = React.useState<"add" | "edit">("add")
  const [selectedSection, setSelectedSection] = React.useState<Outline | null>(null)

  const openAddSheet = () => {
    setSheetMode("add")
    setSelectedSection(null)
    setSheetOpen(true)
  }

  const openEditSheet = (section: Outline) => {
    setSheetMode("edit")
    setSelectedSection(section)
    setSheetOpen(true)
  }


  const handleSave = async (sectionData: Omit<Outline, "id"> & { id?: string }) => {
    if (sheetMode === "add") {
      await createOutline.mutateAsync(sectionData)
      toast.success('Outline created successfully!')
    } else if (sheetMode === "edit" && sectionData.id) {
      await editOutline.mutateAsync({
        outline_id: sectionData.id,
        updates: sectionData,
      })
      toast.success('Outline updated successfully!')
    }

    await refetch()
    setSheetOpen(false)
  }


  const handleDelete = async (section: Outline) => {
    await deleteOutline.mutateAsync(section.id)
    toast.success('Outline deleted successfully!')
    await refetch()
    setSheetOpen(false)
  }

  const handleDeleteSheet = async () => {
    if (!selectedSection) return
    await deleteOutline.mutateAsync(selectedSection.id)
    toast.success('Outline deleted successfully!')
    await refetch()
    setSheetOpen(false)
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const newOutlines = reorder(
      localOutlines,
      result.source.index,
      result.destination.index
    )

    setLocalOutlines(newOutlines)
  }


  const columns: ColumnDef<Outline>[] = [
    {
      id: "drag",
      header: () => null,
      cell: ({ row }) => {
          return (
            <div
              className="cursor-grab"
              data-draggable-handle
            >
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
          )
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "header",
      header: "Header",
      cell: ({ row }) => (
        <button
          className="font-medium text-left hover:underline cursor-pointer"
          onClick={() => openEditSheet(row.original)}
        >
          {row.getValue("header")}
        </button>
      ),
    },
    {
      accessorKey: "sectionType",
      header: "Section Type",
      cell: ({ row }) => (
        <Badge variant="outline" className="font-normal">
          {row.getValue("sectionType")}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
        <div className="flex items-center gap-2">
          {status === "Completed" ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : status === "InProgress" ? (
            <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
          ) : status === "Pending" ? (
            <Clock className="h-4 w-4 text-yellow-500" />
          ) : (
            <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
          )}
          <span>{status}</span>
        </div>
        )
      },
    },
    {
      accessorKey: "target",
      header: "Target",
      cell: ({ row }) => <div className="text-center">{row.getValue("target")}</div>,
    },
    {
      accessorKey: "limit",
      header: "Limit",
      cell: ({ row }) => <div className="text-center">{row.getValue("limit")}</div>,
    },
    {
      accessorKey: "reviewer",
      header: "Reviewer",
      cell: ({ row }) => <div className="text-center">{row.getValue("reviewer")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => openEditSheet(row.original)}>Edit</DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => handleDelete(row.original)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: localOutlines,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        <p>Loading outlines...</p>
      </div>
    )
  }


  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="outline">Outline</TabsTrigger>
            <TabsTrigger value="past-performance">
              Past Performance
              <Badge variant="secondary" className="ml-2">
                3
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="key-personnel">
              Key Personnel
              <Badge variant="secondary" className="ml-2">
                2
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings2 className="mr-2 h-4 w-4" />
                Customize Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {table
                .getAllColumns()
                .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" onClick={openAddSheet}>
            <Plus className="mr-2 h-4 w-4" />
            Add Section
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <DragDropContext onDragEnd={onDragEnd}>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                        return (
                            <TableHead key={header.id}>
                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>
                        )
                        })}
                    </TableRow>
                    ))}
                </TableHeader>
                
                <Droppable droppableId="outline-table-body">
                    {(droppableProvided) => (
                        <TableBody
                            ref={droppableProvided.innerRef}
                            {...droppableProvided.droppableProps}
                        >
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row, index) => {
                                    const rowData = row.original;
                                    return (
                                        <Draggable key={rowData.id} draggableId={rowData.id} index={index}>
                                            {(draggableProvided, snapshot) => (
                                                <TableRow
                                                    ref={draggableProvided.innerRef}
                                                    {...draggableProvided.draggableProps}
                                                    data-state={row.getIsSelected() && "selected"}
                                                    className={snapshot.isDragging ? "bg-accent/50 shadow-lg" : ""}
                                                >
                                                    {row.getVisibleCells().map((cell) => (
                                                        <TableCell 
                                                            key={cell.id}
                                                            {...(cell.column.id === "drag" ? draggableProvided.dragHandleProps : {})}
                                                        >
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            )}
                                        </Draggable>
                                    )
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                            {droppableProvided.placeholder}
                        </TableBody>
                    )}
                </Droppable>
            </Table>
        </DragDropContext>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex bg-transparent"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0 bg-transparent"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0 bg-transparent"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex bg-transparent"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <SectionSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        section={selectedSection}
        mode={sheetMode}
        onSave={handleSave}
        onDelete={handleDeleteSheet}
      />
    </div>
  )
}