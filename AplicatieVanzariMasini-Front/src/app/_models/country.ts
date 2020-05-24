import { Car } from './car';

export interface Country {
    id: number;
    name: string;
    cars?: Car[];
}