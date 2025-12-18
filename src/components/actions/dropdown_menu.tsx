import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";

export default function DropdownMenu({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <RadixDropdownMenu.Root>{children}</RadixDropdownMenu.Root>;
}

function Trigger() {
  return <RadixDropdownMenu.Trigger>Menu</RadixDropdownMenu.Trigger>;
}

function Content({ children }: { children?: React.ReactNode }) {
  return <RadixDropdownMenu.Content>{children}</RadixDropdownMenu.Content>;
}

function Label() {
  return (
    <RadixDropdownMenu.Label>DropdownMenu Content</RadixDropdownMenu.Label>
  );
}

function Item() {
  return <RadixDropdownMenu.Item>Item</RadixDropdownMenu.Item>;
}

function Separator() {
  return <RadixDropdownMenu.Separator />;
}

DropdownMenu.Trigger = Trigger;
DropdownMenu.Content = Content;
DropdownMenu.Label = Label;
DropdownMenu.Item = Item;
DropdownMenu.Separator = Separator;
