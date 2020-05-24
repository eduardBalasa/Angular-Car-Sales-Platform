import { Announce } from './announce';

export interface Car {
    id: number;
    km: string;
    price: string;
    enginePower: string;
    cylindricalCapacity: string;
    state: string;
    damaged: string;
    descripion: string;
    particleFilter: string;
    rightHandDrive: string;
    brandId: number;
    modelId: number;
    bodyId: number;
    fuelId: number;
    countryId: number;
    transmissionId: number;
    manufacturingDateId: number;
    gearboxId: number;
    pollutionRuleId: number;
    announce?: Announce[];
}