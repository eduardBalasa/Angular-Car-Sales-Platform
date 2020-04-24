import { Car } from './car';

export interface Country {
    countryId: number;
    name: string;
    cars?: Car[];
}