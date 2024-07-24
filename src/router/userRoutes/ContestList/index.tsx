import ContestDataTable from "@/router/userRoutes/ContestList/components/ContestTable";

function ContestList() {
    return (
        <div className="w-full flex justify-center py-12">
            <div className="w-3/4">
                <ContestDataTable />
            </div>
        </div>
    );
}

export default ContestList;
