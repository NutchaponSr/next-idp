import { Table } from "@tanstack/react-table";

import { ResponseType } from "@/modules/groups/api/use-get-groups-by-year";

export type GroupTable = Table<ResponseType>;