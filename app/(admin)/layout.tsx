import Image from "next/image";
import TeamSwitcher from "@/components/shared/team-switcher";
import { MainNav } from "@/components/shared/main-nav";
import { UserNav } from "@/components/shared/user-nav";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";
import ThemeToggle from "@/components/shared/theme-toggle";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authConfig);
  if (!session) redirect("/signin");

  return (
    <>
      <div className="md:hidden">
        {/* <Image
          src="/"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        /> */}
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <ThemeToggle />
              <UserNav session={session} />
            </div>
          </div>
        </div>
        <div className="space-y-4 p-8 pt-6 max-w-screen-xl mx-auto w-full">
          {children}
        </div>
      </div>
    </>
  );
}
