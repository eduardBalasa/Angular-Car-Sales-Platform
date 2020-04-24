import { Car } from './car';

export interface Body {
    bodyId: number;
    name: string;
    cars?: Car[];
}