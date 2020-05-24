import { Car } from './car';

export interface Body {
    id: number;
    name: string;
    cars?: Car[];
}