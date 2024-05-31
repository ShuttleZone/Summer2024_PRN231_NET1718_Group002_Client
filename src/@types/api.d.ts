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
    Id: string;
    OpenTime: string;
    CloseTime: string;
    MinDuration: number;
    ClubId: string;
    Courts: CourtInformationType[];
}

export interface CourtInformationType {
    Id: string;
    Name: string;
}
