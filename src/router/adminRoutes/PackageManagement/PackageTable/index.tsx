import {useGetPackagesQuery} from "@/store/services/packs/package.api";

function PackageTable() {
    const {data: packages, isError, isLoading} = useGetPackagesQuery();
    if (isError) return <div>Error in loading data</div>;
    if (isLoading) return <div>Loading...</div>;
    console.log(packages);

    return <div>Package Table</div>;
}

export default PackageTable;
