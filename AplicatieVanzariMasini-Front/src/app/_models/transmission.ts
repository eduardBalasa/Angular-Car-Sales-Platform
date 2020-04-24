import { Car } from './car';

export interface Transmission {
    transmissionId: number;
    name: string;
    cars?: Car[];
}