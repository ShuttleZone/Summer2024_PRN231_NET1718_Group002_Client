interface NavButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?:
        | string
        | "flex flex-col items-center text-gray-600 hover:text-green-600 active:text-white active:bg-green-600 active:py-2 active:px-4 active:rounded-md active:nav-active";
}

const NavButton: React.FC<NavButtonProps> = ({
    children,
    onClick,
    className,
}) => {
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
};

export default NavButton;
