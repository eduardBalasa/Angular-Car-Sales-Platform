export interface PhotoForAnnounce {
    id: number;
    url: string;
    description: string;
    dateAdded: Date;
    isMain: boolean;
    isApproved: boolean;
    announceId: number;
}