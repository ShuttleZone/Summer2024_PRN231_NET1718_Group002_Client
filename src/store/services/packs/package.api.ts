import {
    ChangePackageStatus,
    CreatePackage,
    PackageInformation,
} from "@/@types/api";
import ApiRouteBuilder from "@/lib/api.util";
import commonApi from "@/store/common.api";

type PackageReturnType = {
    value: PackageInformation[];
};

const packageApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        getPackages: build.query<PackageInformation[], void>({
            query: () => {
                const routeBuilder = new ApiRouteBuilder("/api/Package");
                return routeBuilder.build();
            },
            transformResponse(baseQueryReturnValue: PackageReturnType) {
                return baseQueryReturnValue.value;
            },
        }),
        createPackage: build.mutation<CreatePackage, CreatePackage>({
            query(body) {
                return {
                    url: "/api/Package/create-package",
                    method: "POST",
                    body: body,
                };
            },
        }),
        deletePackage: build.mutation({
            query: ({packageId}) => ({
                url: `api/Package/delete-package/${packageId}`,
                method: "DELETE",
            }),
        }),
        changePackageStatus: build.mutation<ChangePackageStatus, {id: string}>({
            query(data) {
                return {
                    url: `/api/Package/update-package-status/${data.id}`,
                    method: "PUT",
                };
            },
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetPackagesQuery,
    useCreatePackageMutation,
    useDeletePackageMutation,
    useChangePackageStatusMutation,
} = packageApi;
