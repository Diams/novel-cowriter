import * as Tabs from "@radix-ui/react-tabs";

export default function Tab({
  children,
  default_value,
}: {
  children?: React.ReactNode;
  default_value?: string;
}) {
  return (
    <Tabs.Root defaultValue={default_value} className="space-y-2.5">
      {children}
    </Tabs.Root>
  );
}

function List({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Tabs.List className={`flex gap-2 ${className}`}>{children}</Tabs.List>
  );
}

function Trigger({
  children,
  value,
}: {
  children?: React.ReactNode;
  value: string;
}) {
  return (
    <Tabs.Trigger
      value={value}
      className="flex-1 bg-[rgba(17,28,47,0.5)] hover:bg-[#111C2F]/75 data-[state=active]:bg-linear-120 data-[state=active]:from-[#7C3AED]/75 data-[state=active]:to-[#111C2F]/55 data-[state=active]:hover:from-[#111C2F]/75 text-muted data-[state=active]:text-foreground border data-[state=active]:border-[#7C3AED]/40 rounded-xl p-2.5 cursor-pointer hover:-translate-y-px transition-all duration-150"
    >
      {children}
    </Tabs.Trigger>
  );
}

function CommonContent({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

function Content({
  children,
  value,
}: {
  children?: React.ReactNode;
  value: string;
}) {
  return <Tabs.Content value={value}>{children}</Tabs.Content>;
}

Tab.List = List;
Tab.Trigger = Trigger;
Tab.CommonContent = CommonContent;
Tab.Content = Content;
