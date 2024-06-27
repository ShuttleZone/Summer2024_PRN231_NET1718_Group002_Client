import {PackageInformation} from "@/@types/api";
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
    }),
    overrideExisting: true,
});

export const {useGetPackagesQuery} = packageApi;
