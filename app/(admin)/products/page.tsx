import { columns } from "@/components/products/columns";
import { ProductsTable } from "@/components/products/products-table";
import { Button } from "@/components/ui/button";
import { Product } from "@/database/types";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { getProducts } from "./actions";

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between py-5 border-b">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="mt-1 text-muted-foreground">
            Manage your products and inventory here.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/products/new">
              New product <PlusIcon className="ml-2 w-h -4" />
            </Link>
          </Button>
        </div>
      </div>

      <ProductsTable columns={columns} data={products} />
    </div>
  );
}
