import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getDictionary } from "@/dictionaries";
import { Locale } from "@/dictionaries";

import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-provider";
import { Badge } from "./ui/badge";

const MOCK_SESSION = {
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://github.com/shadcn.png",
  },
};

export async function Navbar({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);

  return (
    <nav className="bg-background fixed top-0 right-0 left-0 z-50 flex w-full items-center justify-between p-4 shadow md:p-6">
      <Link href={`/${lang}`} className="flex items-center space-x-2">
        <span className="text-lg font-bold">Fynzo</span>
      </Link>
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 cursor-pointer rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={MOCK_SESSION.user.image || ""} alt={MOCK_SESSION.user.name || ""} />
                <AvatarFallback>{MOCK_SESSION.user.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm leading-none font-medium">{MOCK_SESSION.user.name}</p>
                <p className="text-muted-foreground text-xs leading-none">{MOCK_SESSION.user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/${lang}`}>{dict.navbar.home}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/${lang}/invoices`}>{dict.navbar.invoices}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/${lang}/expenses`}>{dict.navbar.expenses}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/${lang}/agent`}>
                {dict.navbar.agent} <Badge>{dict.navbar.new}</Badge>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <form
              action={async () => {
                "use server";
                // await signOut();
              }}
            >
              <DropdownMenuItem asChild>
                <button type="submit" className="flex w-full">
                  {dict.navbar.signOut}
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
