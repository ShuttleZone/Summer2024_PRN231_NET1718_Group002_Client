import applicationRoles from "@/constants/role.constants";

const getDefaultRoute = (role: string | string[]) => {
    if (Array.isArray(role)) {
        if (role.includes(applicationRoles.ADMIN)) return "/admin";
        if (role.includes(applicationRoles.MANAGER)) return "/manager";
        if (role.includes(applicationRoles.STAFF)) return "/staff";
        return "/";
    } else {
        if (role === applicationRoles.ADMIN) return "/admin";
        if (role === applicationRoles.MANAGER) return "/manager";
        if (role === applicationRoles.STAFF) return "/staff";
        return "/";
    }
};

export default getDefaultRoute;
