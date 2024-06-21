import {Skeleton} from "@/components/ui/skeleton";

interface ClubCardSkeletonsProps {
    length?: number;
}

function ClubCardSkeletons({length = 6}: ClubCardSkeletonsProps) {
    return Array.from({length}).map((_, index) => (
        <li key={index} className="col-span-1">
            <div className="flex flex-col space-y-3 w-full items-center">
                <Skeleton className="w-full aspect-video rounded-xl bg-gray-400/70" />
                <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-full bg-gray-400/70" />
                    <Skeleton className="h-4 w-3/4 bg-gray-400/70" />
                </div>
            </div>
        </li>
    ));
}

export default ClubCardSkeletons;
