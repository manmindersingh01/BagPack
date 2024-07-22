"use client"

import { ColumnDef } from "@tanstack/react-table"
import { FileType } from "../../../typing"
import prettyBytes from "pretty-bytes"
import { FileIcon, defaultStyles } from "react-file-icon"
import colorExtensionMap from "../../../colorExtensionMap"

type SupportedExtensions = keyof typeof defaultStyles;

// Define a fallback style for unsupported extensions
interface FileIconProps {
  color: string;
  labelColor: string;
  labelTextColor: string;
  foldColor: string;
}
const fallbackStyle: Partial<FileIconProps> = {
  color: '#000',
  labelColor: '#000',
  labelTextColor: '#FFF',
  foldColor: '#000',
};

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ cell: { getValue } }) => {
      const type = getValue() as string;
      const extension = type.split('/')[1] as SupportedExtensions;
      const labelColor = colorExtensionMap[`.${extension}`] || '#000'; // default color if not found
      const fileIconStyles = defaultStyles[extension] || fallbackStyle; // fallback style if not found

      return (
        <div className="w-10">
          <FileIcon
            extension={extension}
            labelColor={labelColor}
            {...fileIconStyles}
          />
        </div>
      );
    }
  },
  {
    accessorKey: "fileName",
    header: "Filename",
  },
  {
    accessorKey: "timestamp",
    header: "Date added",
  },
  // size
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ cell: { getValue } }) => {
      const size = getValue() as number;
      return <span>{prettyBytes(size)}</span>
    }
  },
  // downloadUrl
  {
    accessorKey: "downloadUrl",
    header: "Link",
    cell: ({ cell: { getValue } }) => {
      const link = getValue() as string;
      return <a href={link} target="_blank" className="underline text-blue-500 hover:text-blue-600">
        Download
      </a>
    }
  },
  // type

  // actions
];

export default columns;
