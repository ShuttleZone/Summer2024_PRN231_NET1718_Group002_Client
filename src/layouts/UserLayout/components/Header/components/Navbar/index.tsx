import {Link} from "react-router-dom";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {cn} from "@/lib/utils";
import React from "react";

interface NavItem {
    title: string;
    href: string;
    description: string;
}

const features: NavItem[] = [
    {
        title: "Clubs",
        href: "/clubs",
        description: "All the clubs that are available on our platform.",
    },
    {
        title: "Contests",
        href: "/contests",
        description:
            "All active contests that are waiting for you to participate.",
    },
];

const information: NavItem[] = [
    {
        title: "My reservations",
        href: "/my-reservation",
        description: "All the reservations that you have made.",
    },
    {
        title: "My invoices",
        href: "/my-invoices",
        description: "All the invoices that you have received.",
    },
    {
        title: "My contests",
        href: "/contests",
        description: "All the contests that you have participated in.",
    },
    {
        title: "My profile",
        href: "/profile",
        description: "Your profile information.",
    },
];

function Navbar() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link to="/">
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                        >
                            Home
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {features.map((feature) => (
                                <ListItem
                                    key={feature.title}
                                    title={feature.title}
                                    href={feature.href}
                                >
                                    {feature.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        My information
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            {information.map((info) => (
                                <ListItem
                                    key={info.title}
                                    title={info.title}
                                    href={info.href}
                                >
                                    {info.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({className, title, children, ...props}, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    to={props.href || ""}
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
});

export default Navbar;
