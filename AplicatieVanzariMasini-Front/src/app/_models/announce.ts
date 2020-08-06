import { PhotoForAnnounce } from './photoForAnnounce';
import { Car } from './car';
import { User } from './user';

export interface Announce {
    announceId: number;
    title: string;
    description: string;
    createdDate: Date;
    features: string;
    carId: number;
    mainPhotoUrl?: string;
    km?: string;
    price?: string;
    enginePower?: string;
    cylindricalCapacity?: string;
    state?: string;
    damaged?: string;
    particleFilter?: string;
    rightHandDrive?: string;
    userId?: number;
    userName?: string;
    userMainPhotoUrl?: string;
    userCreated?: string;
    brand?: string;
    model?: string;
    modelVersion?: string;
    body?: string;
    fuel?: string;
    location: string;
    country?: string;
    transmission?: string;
    manufacturingDate?: string;
    gearbox?: string;
    pollutionRule?: string;
    car?: Car;
    photosForAnnounce?: PhotoForAnnounce[];
}
