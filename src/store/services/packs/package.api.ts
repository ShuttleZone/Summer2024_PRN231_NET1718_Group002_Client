import {
    ChangePackageStatus,
    CreatePackage,
    PackageInformation,
    UpdatePackage,
    UserCurrentPackage,
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
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({id}) => ({
                              type: "Packages" as never,
                              id,
                          })),
                          {type: "Packages" as never, id: "LIST"},
                      ]
                    : [{type: "Packages" as never, id: "LIST"}],
        }),
        createPackage: build.mutation<CreatePackage, CreatePackage>({
            query(body) {
                return {
                    url: "/api/Package/create-package",
                    method: "POST",
                    body: body,
                };
            },
            invalidatesTags: [{type: "Packages" as never}],
        }),
        deletePackage: build.mutation({
            query: ({packageId}) => ({
                url: `api/Package/delete-package/${packageId}`,
                method: "DELETE",
            }),
            invalidatesTags: [{type: "Packages" as never}],
        }),
        updatePackage: build.mutation<UpdatePackage, UpdatePackage>({
            query(body) {
                return {
                    url: "/api/Package/update-package",
                    method: "PUT",
                    body: body,
                };
            },
            invalidatesTags: (req) => [
                {type: "Packages" as never, id: req?.id},
            ],
        }),
        changePackageStatus: build.mutation<ChangePackageStatus, {id: string}>({
            query(data) {
                return {
                    url: `/api/Package/update-package-status/${data.id}`,
                    method: "PUT",
                };
            },
            invalidatesTags: (req) => [
                {type: "Packages" as never, id: req?.id},
            ],
        }),
        getCurrentPackage: build.query<UserCurrentPackage, void>({
            query: () => {
                const routeBuilder = new ApiRouteBuilder(
                    "api/Package/getUserPackage"
                );
                return routeBuilder.build();
            },
            providesTags: (result) =>
                result
                    ? [{type: "Packages" as never, id: result.packageId}]
                    : [{type: "Packages" as never, id: "DETAIL"}],
        }),
        getPackageHistory: build.query<UserCurrentPackage[], void>({
            query: () => {
                const routeBuilder = new ApiRouteBuilder(
                    "api/Package/getUserPackageHistory"
                );
                return routeBuilder.build();
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({packageId}) => ({
                              type: "PackagesHistory" as never,
                              id: packageId,
                          })),
                          {type: "PackagesHistory" as never, id: "LIST"},
                      ]
                    : [{type: "PackagesHistory" as never, id: "LIST"}],
        }),
        unsubPackage: build.mutation<boolean, void>({
            query() {
                return {
                    url: "/api/Package/unsubPackage",
                    method: "PUT",
                };
            },
            invalidatesTags: [{type: "PackagesHistory" as never}],
        }),
        getPackageDetail: build.query<PackageInformation, string>({
            query: (id) => {
                const routeBuilder = new ApiRouteBuilder(`api/Package/${id}`);
                return routeBuilder.build();
            },
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetPackageHistoryQuery,
    useGetPackagesQuery,
    useGetCurrentPackageQuery,
    useCreatePackageMutation,
    useDeletePackageMutation,
    useChangePackageStatusMutation,
    useUpdatePackageMutation,
    useUnsubPackageMutation,
    useGetPackageDetailQuery,
} = packageApi;
