import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";

export default function DropdownMenu({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <RadixDropdownMenu.Root>{children}</RadixDropdownMenu.Root>;
}

function Trigger({ children }: { children?: React.ReactNode }) {
  return <RadixDropdownMenu.Trigger>{children}</RadixDropdownMenu.Trigger>;
}

function Content({ children }: { children?: React.ReactNode }) {
  return <RadixDropdownMenu.Content>{children}</RadixDropdownMenu.Content>;
}

function Label({ children }: { children?: React.ReactNode }) {
  return <RadixDropdownMenu.Label>{children}</RadixDropdownMenu.Label>;
}

function Item({ children }: { children?: React.ReactNode }) {
  return <RadixDropdownMenu.Item>{children}</RadixDropdownMenu.Item>;
}

function Separator() {
  return <RadixDropdownMenu.Separator />;
}

DropdownMenu.Trigger = Trigger;
DropdownMenu.Content = Content;
DropdownMenu.Label = Label;
DropdownMenu.Item = Item;
DropdownMenu.Separator = Separator;
