import { Car } from './car';

export interface Brand {
    brandId: number;
    name: string;
    cars?: Car[];
}