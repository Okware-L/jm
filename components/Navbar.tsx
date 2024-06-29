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
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed z-10 w-full border-b border-gray-500 bg-gray-100 bg-opacity-70 text-black backdrop-blur-lg backdrop-filter"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-0">
        <Link href="/" className="mx-auto md:hidden">
          <Image src="/jmlogoblack.svg" alt="Logo" width={84} height={54} />
        </Link>

        <Link href="/" className="hidden md:block">
          <Image src="/jmlogoblack.svg" alt="Logo" width={84} height={54} />
        </Link>

        <div className="hidden items-center space-x-4 md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="from-muted/50 to-muted flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none focus:shadow-md"
                          href="/About"
                        >
                          <Image
                            src="/jmlogoblack.svg"
                            alt="hm"
                            width={84}
                            height={84}
                          />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            About Us
                          </div>
                          <p className="text-muted-foreground text-sm leading-tight">
                            Learn more about our company and mission.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/careers" title="Careers">
                      Join our team and make a difference.
                    </ListItem>
                    <ListItem href="/charity" title="Charity">
                      Our initiatives to give back to the community.
                    </ListItem>
                    <ListItem href="/FAQ" title="FAQ">
                      Frequently asked questions about our services.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem href="/Invest" title="Invest">
                      Explore investment opportunities with us.
                    </ListItem>
                    <ListItem href="/Acquisitions" title="Acquisitions">
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
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div>
          {/**Call To Action */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="https://invest.jmqafri.org" passHref legacyBehavior>
                  <NavigationMenuLink className="hidden rounded-md bg-indigo-200 p-3 md:block">
                    Open App
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button aria-label="Open Menu">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
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
              <nav>
                <ul className="flex flex-col space-y-4">
                  <li>
                    <Link href="https://invest.jmqafri.org">
                      <button className="rounded-md bg-indigo-200 p-3">
                        <p className="font-semibold">Open App</p>
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/About" className="text-lg font-medium">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="text-lg font-medium">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/charity" className="text-lg font-medium">
                      Charity
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-lg font-medium">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/invest" className="text-lg font-medium">
                      Invest
                    </Link>
                  </li>
                  <li>
                    <Link href="/acquisitions" className="text-lg font-medium">
                      Acquisitions
                    </Link>
                  </li>
                  <li>
                    <Link href="/pharma" className="text-lg font-medium">
                      Pharma
                    </Link>
                  </li>
                  <li>
                    <Link href="/partnership" className="text-lg font-medium">
                      Partnership
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-lg font-medium">
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.div>
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
              "hover:text-accent-foreground focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent focus:bg-accent",
              className,
            )}
            href={href}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";

export default Navbar;
