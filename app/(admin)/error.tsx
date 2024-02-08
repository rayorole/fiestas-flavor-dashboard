"use client";
import { Separator } from "@/components/ui/separator";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Loading() {
    return (
        <div className="w-full h-full flex gap-3 flex-col my-40 items-center justify-center">
            <div>
                <div className="flex items-center space-x-4">
                    <div className="rounded-full p-2 border bg-muted">
                        <ExclamationTriangleIcon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-sm font-medium leading-none">
                            Ack, something went wrong!
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            We&apos;re sorry but we can&apos;t load the page you requested.
                        </p>
                    </div>
                </div>

                <Separator className="my-4" />
                <div className="flex h-5 items-center space-x-4 text-sm">
                    <Link href="/">
                        Return to dashboard
                    </Link>
                    <Separator orientation="vertical" />
                    <Link href="mailto:ray.orole@gmail.com">
                        Contact support
                    </Link>
                </div>
            </div>

            {/* <div className="flex space-x-2 items-center">
                <div className="p-2 rounded-full bg-muted border">
                    <ExclamationTriangleIcon className="w-6 h-6 text-muted-foreground" />
                </div>

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Ack, something went wrong!
                </h3>
            </div>

            <p className="text-sm text-muted-foreground">
                We&apos;re sorry but we can&apos;t load the page you requested.
            </p> */}
        </div>
    );
}
