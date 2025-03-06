import { TableRows } from "@/components/layouts/table/table-row";
import { TableFooter } from "@/components/layouts/table/table-footer";
import { TableHeader } from "@/components/layouts/table/table-header";
import { useTable } from "@/stores/use-table";
import { BaseComponents } from "@/types/table";

export const TableComponents = <T extends { id: string }>({
  data,
  columns,
  isOpenToolbar,
  searchQuery,
  renderCell
}: BaseComponents<T>) => {
  const { selectRows } = useTable();

  const ids = data.map((row) => row.id);
  const allSelected = ids.every((id) => selectRows.has(id))

  return (
    <div className="relative">
      <TableHeader
        ids={ids}
        columns={columns}
        isOpenToolbar={isOpenToolbar}
        allSelected={allSelected}
      />
      <TableRows 
        data={data}
        columns={columns}
        searchQuery={searchQuery}
        renderCell={renderCell}
      />
      <TableFooter 
        columns={columns}
        data={data}
      />
    </div>
  );
}