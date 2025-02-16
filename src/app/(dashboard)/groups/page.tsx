"use client";

import { Group } from "@/constants/workspaces";

import { Banner } from "@/components/banner";

import { Content } from "@/modules/groups/components/content";

const GroupsPage = () => {
  return (
    <main className="grow-0 shrink flex flex-col h-[calc(100vh-44px)] max-h-full relative w-auto transition-all pt-11">
      <div className="flex flex-col grow relative overflow-auto">
        <Banner workspace={Group} />
        <Content />
      </div>
    </main>
  );
}

export default GroupsPage;