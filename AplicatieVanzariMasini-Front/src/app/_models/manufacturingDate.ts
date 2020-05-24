import { Car } from './car';

export interface ManufacturingDate {
    id: number;
    year: string;
    cars?: Car[];
}