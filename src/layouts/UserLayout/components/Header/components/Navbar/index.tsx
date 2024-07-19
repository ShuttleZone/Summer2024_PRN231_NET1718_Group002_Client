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
        title: "Câu lạc bộ",
        href: "/clubs",
        description:
            "Tất cả các câu lạc bộ hiện có trên nền tảng của chúng tôi.",
    },
    {
        title: "Cuộc thi đấu",
        href: "/contests",
        description:
            "Tất cả các cuộc thi mà bạn có thể tham gia và thể hiện tài năng của mình.",
    },
];

const information: NavItem[] = [
    {
        title: "Lịch đặt sân",
        href: "/my-reservation",
        description: "Tất cả các lịch đặt sân của bạn.",
    },
    {
        title: "Hóa đơn",
        href: "/my-invoices",
        description: "Tất cả các hóa đơn mà bạn đã tạo ra.",
    },
    {
        title: "Cuộc thi đấu của tôi",
        href: "/my-contests",
        description: "Tất cả các cuộc thi mà bạn đã tham gia.",
    },
    {
        title: "Hồ sơ cá nhân",
        href: "/profile",
        description: "Thông tin cá nhân của bạn.",
    },
    {
        title: "Lịch sử giao dịch",
        href: "/transactions",
        description: "Các giao dịch bạn đã từng thanh toán",
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
                            Trang chủ
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Tính năng</NavigationMenuTrigger>
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
                        Thông tin cá nhân
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
