export interface ReviewType {
    id: string;
    rating: number;
}

export interface ClubImageType {
    id: string;
    imageUrl: string;
}
export interface ClubOpenDayType {
    id: number;
    date: string;
}

export interface ClubType {
    id: string;
    clubName: string;
    clubAddress: string;
    clubPhone: string;
    clubDescription: string;
    openTime: string;
    closeTime: string;
    minDuration: number;
    clubImages: ClubImageType[];
    openDays: ClubOpenDayType[];
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
    price: number;
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

export interface BookedSlotType {
    CourtName: string;
    StartTime: string;
    EndTime: string;
    Date: string;
}

export interface PaymentPayload {
    orderInfo: string;
    fullName: string;
    orderType: string;
    description: string;
    amount: 0;
    createdDate: Date;
}
