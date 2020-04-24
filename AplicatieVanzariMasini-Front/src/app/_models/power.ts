import { Car } from './car';

export interface Power {
    powerId: number;
    name: string;
    cars?: Car[];
}