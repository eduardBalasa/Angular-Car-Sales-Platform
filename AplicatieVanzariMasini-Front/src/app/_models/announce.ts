import { PhotoForAnnounce } from './photoForAnnounce';

export interface Announce {
    announceId: number;
    title: string;
    description: string;
    createdDate: Date;
    carId: number;
    photoForAnnounce?: PhotoForAnnounce[];
    km?: string;
    price?: string;
    enginePower?: string;
    cylindricalCapacity?: string;
    state?: string;
    damaged?: string;
    descripion?: string;
    particleFilter?: string;
    rightHandDrive?: string;
    brand?: string;
    model?: string;
    modelVersion?: string;
    body?: string;
    fuel?: string;
    country?: string;
    transmission?: string;
    manufacturingDate?: string;
    gearbox?: string;
    pollutionRule?: string;
}
