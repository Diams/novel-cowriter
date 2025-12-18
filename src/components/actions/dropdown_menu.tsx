import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";

export default function DropdownMenu() {
  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Trigger>Menu</RadixDropdownMenu.Trigger>
      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content>
          <RadixDropdownMenu.Label>
            DropdownMenu Content
          </RadixDropdownMenu.Label>
          <RadixDropdownMenu.Item>Item 1</RadixDropdownMenu.Item>
          <RadixDropdownMenu.Separator />
          <RadixDropdownMenu.Item>Item 2</RadixDropdownMenu.Item>
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
}
