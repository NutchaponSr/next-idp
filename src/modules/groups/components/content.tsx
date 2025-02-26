"use client";

import { Layouts } from "@/components/layouts";
import { useLayout } from "@/stores/use-layout";
import { useInitialGroups } from "../hooks/use-initial-groups";
import { groupColumns } from "@/constants/filters";

export const Content = () => {
  // TODO: Query year **?year=2025
  const year = new Date().getFullYear().toString();

  const {
    data,
    isLoading,
  } = useInitialGroups(year);
  const { mode } = useLayout();

  if (isLoading) return null;

  return (
    <div className="contents">
      <Layouts data={data} columns={groupColumns} mode={mode} />
      <div className="px-24 border-t border-[#e9e9e7] h-3" />
    </div>
  );
}