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

export interface ClubDropdownType {
    Id: string;
    ClubName: string;
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
    reservationDetailStatus: string;
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
export interface CourtType {
    id: string;
    name: string;
    courtType: string;
    courtStatus: number;
    clubId: string;
    clubName: string;
    openTime: string;
    closeTime: string;
    minDuration: number;
    price: number;
}

export interface ClubRequest {
    clubName: string;
    clubAddress: string;
    id: string;
    clubPhone: string;
    clubDescription: string;
    status: string;
    openTime: Date;
    closeTime: Date;
    // acceptClubRequestAdmin: (id: string) => void;
}

export interface AcceptClubRequest {
    id: string;
}
export interface StatusNav {
    Id: number;
    Status: string;
    Text: string;
}

export interface ReservationType {
    id: string;
    bookingDate: string;
    totalPrice: number;
    reservationStatusEnum: string;
    courtNames: string[];
    expiredTime: string;
}

interface ClubListManagement {
    ClubName: string;
    ClubAddress: string;
    OpenTime: string;
    CloseTime: string;
    Courts: CourtId[];
    Reviews: CourtReview[];
}

interface CourtId {
    id: string;
}
interface CourtReview {
    id: string;
    rating: number;
}

interface ClubManagement {
    clubName: string;
    clubAddress: string;
    openHours: string;
    rating: number;
    totalCourt: number;
    totalReview: number;
}

export interface CreateContestResponse {
    id: string;
    contestDate: string;
    maxPlayer: number;
    policy: string;
    contestStatus: string;
}

interface CourtByClub {
    name: string;
    courtType: string;
    courtStatus: string;
    price: number;
}

interface ReviewRequest {
    clubId: string;
    rating: number;
    comment: string;
}
