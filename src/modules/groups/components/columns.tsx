import { ColumnDef } from "@tanstack/react-table"; 
import { ResponseType } from "../api/use-get-groups-by-year";
import { Button } from "@/components/ui/button";
import { CalendarDayIcon, GripVerticalIcon, HashIcon, TextFontIcon } from "@/components/icons";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<ResponseType>[] = [
  {
    id: "actions",
    cell: ({}) => (
      <Button variant="ghost">
        <GripVerticalIcon className="text-[#b9b9b7]" />
      </Button>
    )
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox 
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
      />
    ),
    cell: ({ row }) => (
      <Checkbox 
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    accessorKey: "name",
    header: () => (
      <div className="flex items-center">
        <TextFontIcon className="size-4 text-[#A4A4A2] mr-1.5" />
        Name
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="size-[22px] inline-flex items-center justify-center mr-1">
            <div className="flex items-center justify-center size-5 text-lg">
              {row.original.icon ? row.original.icon : <HashIcon className="size-4" />}
            </div>
          </div>
          <p className="text-sm font-medium">
            {row.original.name}
          </p>
        </div>
        <div className="whitespace-normal relative hidden group-hover:block border">
          <div className="flex justify-end absolute -top-3 right-0 left-0 mr-1">
            <div className="flex pointer-events-auto sticky right-1">
              {/* <GroupButtonPanel data={row.original} /> */}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "year",
    header: ({  }) => (
      <div className="flex items-center">
        <CalendarDayIcon className="size-3.5 text-[#A4A4A2] mr-1.5" />
        Year
      </div>
    ),
    cell: ({ row }) => row.getValue("year"),
  },
];