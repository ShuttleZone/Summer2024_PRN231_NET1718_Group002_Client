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
    ownerName: string;
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
    openDateInWeeks: OpenDateInWeek[];
}

export interface CourtInformationType {
    id: string;
    name: string;
    courtStatus: string;
    price: number;
}
export interface OpenDateInWeek {
    date: string;
}

export interface ClubContest {
    clubName: string;
    clubAddress: string;
    clubDescription: string;
    clubPhone: string;
    openTime: string;
    closeTime: string;
}

export interface CourtContest {
    courtStatus: string;
    courtType: string;
    name: string;
    club: ClubContest;
}

export interface ReservationDetailsContest {
    startTime: string;
    endTime: string;
    court: CourtContest;
}

export interface ReservationContest {
    bookingDate: string;
    totalPrice: number;
    reservationDetailsDtos: ReservationDetailsContest[];
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
    reservation: ReservationContest;
    userContests: UserContest[];
}

export interface ReservationDetailType {
    id: string;
    clubId: string;
    courtName: string;
    startTime: string;
    endTime: string;
    price: number;
    reservationDetailStatus: string;
    isPaymentExpired: boolean;
}

export interface LoginAccount {
    id: string;
    account: string;
    password: string;
    token: string;
    refreshToken: string;
}

export interface RegisterAccount {
    role: number;
    fullname: string;
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    repassword: string;
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
    clubStatusEnum: string;
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
interface ClubListManagementReturnType {
    value: ClubListManagementOData[];
}
interface ClubListManagementOData {
    id: string;
    clubName: string;
    clubAddress: string;
    openTime: string;
    closeTime: string;
    courts: CourtId[];
    reviews: CourtReview[];
    ownerName: string;
    staffs: StaffDto[];
}
interface ClubListManagement {
    Id: string;
    ClubName: string;
    ClubAddress: string;
    OpenTime: string;
    CloseTime: string;
    Courts: CourtId[];
    Reviews: CourtReview[];
    Staffs: StaffDto[];
    OwnerName: string;
}

interface StaffDto {
    id: string;
    userName: string;
    gender: number;
    profileImage: string;
    clubName: string;
    clubAddress: string;
    clubId: string;
}

interface CourtId {
    id: string;
}
interface CourtReview {
    id: string;
    rating: number;
}

interface ClubManagement {
    Id: string;
    clubName: string;
    clubAddress: string;
    openHours: string;
    rating: number;
    totalCourt: number;
    totalReview: number;
    totalStaff: number;
    ownerName: string;
}

export interface CreateContestResponse {
    id: string;
    contestDate: string;
    maxPlayer: number;
    policy: string;
    contestStatus: string;
}

interface CourtByClub {
    id: string;
    name: string;
    courtType: string;
    courtStatus: string;
    price: number;
}

interface ReviewRequest {
    clubId: string;
    rating: number;
    title: string;
    comment: string;
}

interface ReplyReview {
    id: string;
    replyTitle: string;
    replyContent: string;
}

interface ClubReviews {
    id: string;
    rating: number;
    title: string;
    comment: string;
    replyTitle: string;
    replyContent: string;
    replyTime: string;
    replyPerson: string;
    created: string;
    createdBy: string;
    lastModified: string;
    lastModifiedBy: string;
    clubName: string;
    clubDescription: string;
    clubAddress: string;
    clubPhone: string;
}
interface UserProfile {
    id: string;
    userName: string;
    email: string;
    fullname: string;
    phoneNumber: string;
    profileImage: string;
    gender: number;
    totalReservation: number;
    totalWinContest: number;
    balance: number;
}
export interface UserContestResponse {
    id: string;
    fullname: string;
    phoneNumber?: number;
    profilePic?: string;
    isCreatedPerson: boolean;
    isWinner: boolean;
    point: number;
    participantsId: string;
    contestId: string;
}

export interface ContestResponse {
    id: string;
    contestDate: Date;
    maxPlayer: number;
    policy?: string;
    contestStatus?: string;
    userContests?: UserContestResponse[];
}

export interface PackageInformation {
    id: string;
    name: string;
    description: string;
    price: number;
    packageStatus: string;
    packageType: string;
}

export interface UserCurrentPackage {
    userId: string;
    packageId: string;
    packageUserStatus: number;
    startDate: string;
    endDate: string;
    package: PackageInformation;
}

export interface CreatePackage {
    name: string;
    description: string;
    price: number;
    packageType: number;
}

export interface UnsubRespone {
    result: boolean;
}

interface Notification {
    id: string;
    description: string;
    notificationDate: string;
    isRead: boolean;
    userId: string;
}

export interface ChangePackageStatus {
    id: string;
}

export interface UpdatePackage {
    id: string;
    name: string;
    description: string;
    price: number;
    packageType: number;
}

interface Wallet {
    id: string;
    balance: number;
    userId: string;
}
export interface PaymentRequest {
    orderInfo: string;
    fullName: string;
    orderType: string;
    description: string;
    amount: number;
}

export interface RefreshToken {
    accessToken: string;
    refreshToken: string;
}
