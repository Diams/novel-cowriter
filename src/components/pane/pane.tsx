import React, { ReactElement } from "react";

export default function Pane({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const childArray = React.Children.toArray(children);

  // Titleが最初に来ているかチェック
  const firstChild = childArray[0] as ReactElement;
  if (firstChild && firstChild.type !== PaneTitle) {
    console.warn("Pane.Title must be the first child of Pane");
  }

  // Titleが複数ないかチェック
  const titleCount = childArray.filter(
    (child) => React.isValidElement(child) && child.type === PaneTitle
  ).length;

  if (titleCount > 1) {
    console.warn("Pane can only have one Pane.Title");
  }

  return <div className={`border rounded-[22px] ${className}`}>{children}</div>;
}

function PaneTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`py-3 px-3.5 ${className}`}>{children}</div>;
}

function PaneContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`border-t py-3 px-3.5 ${className}`}>{children}</div>;
}

Pane.Title = PaneTitle;
Pane.Content = PaneContent;
