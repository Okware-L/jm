"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed z-10 w-full border-b border-gray-500 bg-gray-100 bg-opacity-70 text-black backdrop-blur-lg backdrop-filter"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-0">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/jmlogoblack.svg" alt="Logo" width={84} height={54} />
          <span className="hidden text-xl font-semibold text-gray-800 md:inline-block">
            {""}JM-Qafri
          </span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex items-center space-x-4">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-gray-800 hover:text-gray-600">
                About
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <ListItem href="/about" title="About Us">
                    Learn more about our company and mission.
                  </ListItem>
                  <ListItem href="/careers" title="Careers">
                    Join our team and make a difference.
                  </ListItem>
                  <ListItem href="/faq" title="FAQ">
                    Frequently asked questions about our services.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-gray-800 hover:text-gray-600">
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/invest" title="Invest">
                    Explore investment opportunities with us.
                  </ListItem>
                  <ListItem href="/acquisitions" title="Acquisitions">
                    Learn about our acquisition strategies.
                  </ListItem>
                  <ListItem href="/pharma" title="Pharma">
                    Discover our pharmaceutical ventures.
                  </ListItem>
                  <ListItem href="/partnership" title="Partnership">
                    Partner with us for mutual growth.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuList>
              <NavigationMenuLink
                href="/charity"
                className="text-gray-800 hover:text-gray-600"
              >
                Charity
              </NavigationMenuLink>
            </NavigationMenuList>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="https://invest.jmqafri.org" legacyBehavior passHref>
                  <NavigationMenuLink className="hidden rounded-md bg-indigo-200 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-indigo-300 md:inline-block">
                    Open App
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Sheet>
            <SheetTrigger asChild>
              <button aria-label="Open Menu" className="md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                  />
                </svg>
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6">
                <ul className="space-y-4">
                  <li>
                    <Link href="https://invest.jmqafri.org">
                      <button className="w-full rounded-md bg-indigo-200 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-indigo-300">
                        Open App
                      </button>
                    </Link>
                  </li>
                  <MobileNavItem href="/about" label="About Us" />
                  <MobileNavItem href="/careers" label="Careers" />
                  <MobileNavItem href="/charity" label="Charity" />
                  <MobileNavItem href="/faq" label="FAQ" />
                  <MobileNavItem href="/invest" label="Invest" />
                  <MobileNavItem href="/acquisitions" label="Acquisitions" />
                  <MobileNavItem href="/pharma" label="Pharma" />
                  <MobileNavItem href="/partnership" label="Partnership" />
                  <MobileNavItem href="/contact" label="Contact" />
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

type ListItemProps = React.ComponentPropsWithoutRef<"a"> & {
  title: string;
  href: string;
};

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-indigo-100 focus:bg-indigo-100",
              className,
            )}
            href={href}
            {...props}
          >
            <div className="text-sm font-medium text-gray-900">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-gray-600">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";

const MobileNavItem: React.FC<{ href: string; label: string }> = ({
  href,
  label,
}) => (
  <li>
    <Link
      href={href}
      className="block rounded-md p-2 text-base font-medium text-gray-600 transition-colors hover:bg-indigo-100 hover:text-gray-900"
    >
      {label}
    </Link>
  </li>
);

export default Navbar;
