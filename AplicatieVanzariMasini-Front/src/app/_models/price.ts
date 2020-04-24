import { Car } from './car';

export interface Price {
    priceId: number;
    name: string;
    cars?: Car[];
}