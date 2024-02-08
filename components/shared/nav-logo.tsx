"use client";

import { Badge } from "../ui/badge";

export default function NavLogo() {
  return (
    <div className="flex items-center space-x-2">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Fiestas Flavor
      </h3>
      <Badge>Admin</Badge>
    </div>
  );
}
