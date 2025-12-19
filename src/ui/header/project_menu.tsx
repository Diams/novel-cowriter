"use client";

import {
  IconBaselineDensityMedium,
  IconFileExport,
  IconFileImport,
} from "@tabler/icons-react";
import { useRef } from "react";
import DropdownMenu from "@/components/actions/dropdown_menu";
import { ProjectData } from "@/utils/data_type";
import { GetAllCanons } from "@/utils/data_accessor/canon_data_accessor";
import { GetAllChatMessages } from "@/utils/data_accessor/chat_message_data_accessor";

export default function ProjectMenu() {
  const file_input_ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <div className="flex gap-1 items-center">
            <IconBaselineDensityMedium size={18} />
            <div>プロジェクト</div>
          </div>
        </DropdownMenu.Trigger>
        <div className="mr-2">
          <DropdownMenu.Content>
            <DropdownMenu.Item
              onSelect={() => {
                const project_data: ProjectData = {
                  structure_version: 1,
                  canons: GetAllCanons(),
                  chat_history: GetAllChatMessages(),
                };
                const data_str =
                  "data:text/json;charset=utf-8," +
                  encodeURIComponent(JSON.stringify(project_data, null, 2));
                const download_anchor_node = document.createElement("a");
                download_anchor_node.setAttribute("href", data_str);
                const jst_date = new Date(
                  new Date().getTime() + 9 * 60 * 60 * 1000
                );
                download_anchor_node.setAttribute(
                  "download",
                  `project_data_${jst_date
                    .toISOString()
                    .replace(/[:.]/g, "")}.json`
                );
                document.body.appendChild(download_anchor_node);
                download_anchor_node.click();
                download_anchor_node.remove();
              }}
            >
              <div className="flex gap-1 items-center">
                <IconFileExport size={16} />
                <div>エクスポート</div>
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onSelect={() => {
                file_input_ref.current?.click();
              }}
            >
              <div className="flex gap-1 items-center">
                <IconFileImport size={16} />
                <div>インポート</div>
              </div>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </div>
      </DropdownMenu>
      <input type="file" className="hidden" ref={file_input_ref} />
    </>
  );
}
