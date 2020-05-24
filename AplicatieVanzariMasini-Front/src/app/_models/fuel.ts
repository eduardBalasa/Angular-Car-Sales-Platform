import { Car } from './car';

export interface Fuel {
    id: number;
    name: string;
    cars?: Car[];
}