"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/database/types";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DotsHorizontalIcon,
  CaretSortIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import Image from "next/image";
import { Input } from "@/components/ui/input";

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <CaretSortIcon className="w-4 h-4 ml-1" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: row.original.currency,
      }).format(amount);

      return <span>{formatted}</span>;
    },
  },
  {
    accessorKey: "currency",
    header: "Currency",
    cell: ({ row }) => {
      return (
        <Badge variant="secondary">{row.original.currency.toUpperCase()}</Badge>
      );
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "createdAt",
    header: "Creation Date",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt!);
      return (
        <span>
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <>
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    navigator.clipboard.writeText(product.slug);
                    toast.info("Slug copied to clipboard");
                  }}
                >
                  Copy slug
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DialogTrigger asChild>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Archive</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <div className="rounded-full p-2 border bg-muted">
                    <Pencil1Icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <span>Edit product</span>
                </DialogTitle>
                <DialogDescription className="grid grid-cols-6 gap-8 pt-5">
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="h-32 w-32 relative border rounded overflow-hidden">
                      <Image
                        src={product.images[0].file_path}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                  <div className="col-span-4"></div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
