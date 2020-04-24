import { Car } from './car';

export interface Gearbox {
    gearboxId: number;
    name: string;
    cars?: Car[];
}