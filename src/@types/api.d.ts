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

export interface Participant {
    email: string;
    phoneNumer: string;
    id: string;
    fullname: string;
    gender: number;
    userStatusEnum: number;
    isCreatedPerson: boolean;
    isWinner: boolean;
    point: number;
}

export interface ContestInfo {
    id: string;
    contestDate: string;
    maxPlayer: number;
    policy: string;
    contestStatus: number;
    participants: Participant[];
}

export interface ReservationDetailType {
    id: string;
    courtName: string;
    startTime: string;
    endTime: string;
    price: number;
    reservationDetailStatus: string;
}
