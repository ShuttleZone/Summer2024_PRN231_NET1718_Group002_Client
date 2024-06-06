export interface ReviewType {
    id: string;
    rating: number;
}

export interface ClubImageType {
    id: string;
    imageUrl: string;
}

export interface ClubType {
    id: string;
    clubName: string;
    clubAddress: string;
    clubPhone: string;
    clubDescription: string;
    openTime: string;
    closeTime: string;
    clubImages: ClubImageType[];
    reviews: ReviewType[];
}

export interface CourtScheduleType {
    id: string;
    openTime: string;
    closeTime: string;
    minDuration: number;
    clubId: string;
    courts: CourtInformationType[];
}

export interface CourtInformationType {
    id: string;
    name: string;
}

export interface UserContest {
    contestId: string;
    participantsId: string;
    isCreatedPerson: boolean;
    isWinner: boolean;
    point: number;
    id: string;
    fullname: string;
    gender: number;
    email: string;
    phoneNumber: string;
}

export interface ContestInfo {
    id: string;
    contestDate: string;
    maxPlayer: number;
    policy: string;
    contestStatus: number;
    userContests: UserContest[];
}

export interface ReservationDetailType {
    id: string;
    courtName: string;
    startTime: string;
    endTime: string;
    price: number;
    reservationDetailStatus: int;
}

export interface LoginAccount {
    id: string;
    account: string;
    password: string;
    token: string;
}

export interface RegisterAccount {
    fullname: string;
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    repassword: string;
    token: string;
}

export interface RegisterResponse {
    token: string;
}
