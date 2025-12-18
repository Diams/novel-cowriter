import {
  IconBaselineDensityMedium,
  IconFileExport,
  IconFileImport,
} from "@tabler/icons-react";
import DropdownMenu from "@/components/actions/dropdown_menu";

export default function ProjectMenu() {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <div className="flex gap-1 items-center">
          <IconBaselineDensityMedium size={18} />
          <div>プロジェクト</div>
        </div>
      </DropdownMenu.Trigger>
      <div className="mr-2">
        <DropdownMenu.Content>
          <DropdownMenu.Item>
            <div className="flex gap-1 items-center">
              <IconFileExport size={16} />
              <div>エクスポート</div>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <div className="flex gap-1 items-center">
              <IconFileImport size={16} />
              <div>インポート</div>
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </div>
    </DropdownMenu>
  );
}
