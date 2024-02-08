"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        "flex items-center space-x-4 lg:space-x-6 mx-12",
        className
      )}
      {...props}
    >
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors",
          pathname === "/" ? "text-primary" : "text-muted-foreground",
          "hover:text-primary"
        )}
      >
        Overview
      </Link>
      <Link
        href="/products"
        className={cn(
          "text-sm font-medium transition-colors",
          pathname === "/products" ? "text-primary" : "text-muted-foreground",
          "hover:text-primary"
        )}
      >
        Products
      </Link>
      <Link
        href="/orders"
        className={cn(
          "text-sm font-medium transition-colors",
          pathname === "/orders" ? "text-primary" : "text-muted-foreground",
          "hover:text-primary"
        )}
      >
        Orders
      </Link>
      <Link
        href="/customers"
        className={cn(
          "text-sm font-medium transition-colors",
          pathname === "/customers" ? "text-primary" : "text-muted-foreground",
          "hover:text-primary"
        )}
      >
        Customers
      </Link>
      <Link
        href="/settings"
        className={cn(
          "text-sm font-medium transition-colors",
          pathname === "/settings" ? "text-primary" : "text-muted-foreground",
          "hover:text-primary"
        )}
      >
        Settings
      </Link>
    </nav>
  );
}
