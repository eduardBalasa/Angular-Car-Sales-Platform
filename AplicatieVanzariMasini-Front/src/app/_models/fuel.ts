import { Car } from './car';

export interface Fuel {
    fuelId: number;
    name: string;
    cars?: Car[];
}