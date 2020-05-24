import { Car } from './car';

export interface Transmission {
    id: number;
    name: string;
    cars?: Car[];
}