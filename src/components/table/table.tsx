"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileType } from "../../../typing";
import { Button } from "../ui/button";
import { PenLineIcon, TrashIcon } from "lucide-react";
import { useAppStore } from "../../../store/store";
import { DeleteModel } from "../DeleteModel";
import { RenameModel } from "../RenameModel";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends FileType, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [setIsDeleteModelOpen, setFileId, setFileName, setIsRenameModelOpen] = useAppStore((state) => [
    state.setIsDeleteModelOpen,
    state.setFileId,
    state.setFileName,
    state.setIsRenameModelOpen,
  ]);

  const openEditModel = (fileId: string, fileName: string) => {
    setFileId(fileId);
    setFileName(fileName);
    setIsRenameModelOpen(true);
  };

  const openDeleteModel = (fileId: string) => {
    setFileId(fileId);
    setIsDeleteModelOpen(true);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              <DeleteModel />
              <RenameModel />
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.id === "timestamp" ? (
                      <div className="flex flex-col">
                        <div className="text-sm">
                          {new Date(cell.getValue() as string).toLocaleDateString()}
                        </div>
                        <div>
                          {new Date(cell.getValue() as string).toLocaleTimeString()}
                        </div>
                      </div>
                    ) : cell.column.id === "fileName" ? (
                      <p
                        onClick={() => openEditModel(row.original.id, cell.getValue() as string)}
                        className=" flex items-center text-blue-600 underline hover:cursor-pointer">
                        {cell.getValue() as string}{""}
                        <PenLineIcon size={15} className="ml-2" />
                      </p>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  <Button
                    variant={"outline"}
                    onClick={() => openDeleteModel(row.original.id)}
                  >
                    <TrashIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                You have no files ...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
