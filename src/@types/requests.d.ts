export interface CreateContestType {}
interface QueryParams {
    sort?: string;
    filter?: string;
    page?: number;
    pageSize?: number;
}

interface UpdateContestRequest {
    sort?: string;
    filter?: string;
    page?: number;
    pageSize?: number;
}

interface UpdateContestRequest {
    id: string;
    userContests: UserContestRequest[];
}

interface UserContestRequest {
    participantsId: string;
    isWinner: boolean;
    point: number;
}
