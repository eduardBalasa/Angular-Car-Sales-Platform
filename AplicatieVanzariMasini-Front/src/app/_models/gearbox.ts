import { Car } from './car';

export interface Gearbox {
    id: number;
    name: string;
    cars?: Car[];
}