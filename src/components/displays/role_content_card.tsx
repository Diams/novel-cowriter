import { ReactNode } from "react";

export default function RoleContentCard({
  children,
  role,
  className,
}: {
  children: ReactNode;
  role: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="font-extrabold">{role}</h3>
      <div>{children}</div>
    </div>
  );
}
