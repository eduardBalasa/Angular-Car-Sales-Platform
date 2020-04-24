import { Car } from './car';

export interface Km {
    kmId: number;
    name: string;
    cars?: Car[];
}