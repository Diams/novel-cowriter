import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";

export default function DropdownMenu({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <RadixDropdownMenu.Root>{children}</RadixDropdownMenu.Root>;
}

function Trigger({ children }: { children?: React.ReactNode }) {
  return (
    <RadixDropdownMenu.Trigger className="hover:bg-accent/15 rounded-md outline-0 px-2 cursor-pointer">
      {children}
    </RadixDropdownMenu.Trigger>
  );
}

function Content({
  children,
  disabled_portal = false,
}: {
  children?: React.ReactNode;
  disabled_portal?: boolean;
}) {
  const dropdown_menu_content = (
    <RadixDropdownMenu.Content className="bg-primary text-sm border rounded-radius2 px-4 py-2">
      {children}
    </RadixDropdownMenu.Content>
  );
  return (
    <>
      {disabled_portal ? (
        <>{dropdown_menu_content}</>
      ) : (
        <RadixDropdownMenu.Portal>
          {dropdown_menu_content}
        </RadixDropdownMenu.Portal>
      )}
    </>
  );
}

function Label({ children }: { children?: React.ReactNode }) {
  return (
    <RadixDropdownMenu.Label className="font-semibold">
      {children}
    </RadixDropdownMenu.Label>
  );
}

function Item({
  children,
  onSelect,
}: {
  children?: React.ReactNode;
  onSelect?: (e: Event) => void;
}) {
  return (
    <RadixDropdownMenu.Item
      onSelect={onSelect}
      className="hover:bg-accent/15 rounded-md px-2 py-1 cursor-pointer"
    >
      {children}
    </RadixDropdownMenu.Item>
  );
}

function Separator() {
  return <RadixDropdownMenu.Separator className="border-b my-1" />;
}

DropdownMenu.Trigger = Trigger;
DropdownMenu.Content = Content;
DropdownMenu.Label = Label;
DropdownMenu.Item = Item;
DropdownMenu.Separator = Separator;
